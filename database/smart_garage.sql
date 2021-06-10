-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------
-- -----------------------------------------------------
-- Schema smart_garage
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema smart_garage
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `smart_garage` DEFAULT CHARACTER SET utf8 ;
USE `smart_garage` ;

-- -----------------------------------------------------
-- Table `smart_garage`.`addresses`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `smart_garage`.`addresses` (
  `address_id` INT(11) NOT NULL AUTO_INCREMENT,
  `city` VARCHAR(45) NOT NULL,
  `country` VARCHAR(45) NOT NULL,
  `postal_code` INT(11) NOT NULL,
  `street_address` VARCHAR(255) NOT NULL DEFAULT '',
  PRIMARY KEY (`address_id`))
ENGINE = InnoDB
AUTO_INCREMENT = 109
DEFAULT CHARACTER SET = latin1;


-- -----------------------------------------------------
-- Table `smart_garage`.`car_segments`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `smart_garage`.`car_segments` (
  `car_segment_id` INT(11) NOT NULL AUTO_INCREMENT,
  `car_segment` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`car_segment_id`))
ENGINE = InnoDB
AUTO_INCREMENT = 7
DEFAULT CHARACTER SET = latin1;


-- -----------------------------------------------------
-- Table `smart_garage`.`manufacturers`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `smart_garage`.`manufacturers` (
  `manufacturer_id` INT(11) NOT NULL AUTO_INCREMENT,
  `manufacturer_name` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`manufacturer_id`))
ENGINE = InnoDB
AUTO_INCREMENT = 20
DEFAULT CHARACTER SET = latin1;


-- -----------------------------------------------------
-- Table `smart_garage`.`models`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `smart_garage`.`models` (
  `model_id` INT(11) NOT NULL AUTO_INCREMENT,
  `model_name` VARCHAR(45) NOT NULL,
  `manufacturer_id` INT(11) NOT NULL,
  `car_segment_id` INT(11) NOT NULL,
  PRIMARY KEY (`model_id`),
  INDEX `fk_models_manufacturers1_idx` (`manufacturer_id` ASC) VISIBLE,
  INDEX `fk_models_car_segments1_idx` (`car_segment_id` ASC) VISIBLE,
  CONSTRAINT `fk_models_car_segments1`
    FOREIGN KEY (`car_segment_id`)
    REFERENCES `smart_garage`.`car_segments` (`car_segment_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_models_manufacturers1`
    FOREIGN KEY (`manufacturer_id`)
    REFERENCES `smart_garage`.`manufacturers` (`manufacturer_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
AUTO_INCREMENT = 79
DEFAULT CHARACTER SET = latin1;


-- -----------------------------------------------------
-- Table `smart_garage`.`users`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `smart_garage`.`users` (
  `user_id` INT(11) NOT NULL AUTO_INCREMENT,
  `first_name` VARCHAR(45) NOT NULL,
  `last_name` VARCHAR(45) NOT NULL,
  `company_name` VARCHAR(45) NOT NULL,
  `phone` VARCHAR(45) NOT NULL,
  `email` VARCHAR(45) NOT NULL,
  `address_id` INT(11) NOT NULL,
  `password` VARCHAR(255) NOT NULL,
  `is_deleted` TINYINT(4) NOT NULL DEFAULT 0,
  `role` ENUM('customer', 'employee') NOT NULL,
  PRIMARY KEY (`user_id`),
  INDEX `fk_customers_addresses_idx` (`address_id` ASC) VISIBLE,
  CONSTRAINT `fk_customers_addresses`
    FOREIGN KEY (`address_id`)
    REFERENCES `smart_garage`.`addresses` (`address_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
AUTO_INCREMENT = 103
DEFAULT CHARACTER SET = latin1;


-- -----------------------------------------------------
-- Table `smart_garage`.`vehicles`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `smart_garage`.`vehicles` (
  `vehicle_id` INT(11) NOT NULL AUTO_INCREMENT,
  `vin` VARCHAR(45) NOT NULL,
  `license_plate` VARCHAR(45) NOT NULL,
  `user_id` INT(11) NOT NULL,
  `model_id` INT(11) NOT NULL,
  `manufactured_year` INT(11) NOT NULL,
  `engine_type` ENUM('gasoline', 'diesel', 'electric', 'hybrid') NOT NULL,
  `transmission` ENUM('manual', 'automatic') NOT NULL DEFAULT 'manual',
  `is_deleted` TINYINT(4) NOT NULL DEFAULT 0,
  PRIMARY KEY (`vehicle_id`),
  INDEX `fk_vehicles_models1_idx` (`model_id` ASC) VISIBLE,
  INDEX `fk_vehicles_customers1_idx` (`user_id` ASC) VISIBLE,
  CONSTRAINT `fk_vehicles_models1`
    FOREIGN KEY (`model_id`)
    REFERENCES `smart_garage`.`models` (`model_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_vehicles_user1`
    FOREIGN KEY (`user_id`)
    REFERENCES `smart_garage`.`users` (`user_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
AUTO_INCREMENT = 18
DEFAULT CHARACTER SET = latin1;


-- -----------------------------------------------------
-- Table `smart_garage`.`visits`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `smart_garage`.`visits` (
  `visit_id` INT(11) NOT NULL AUTO_INCREMENT,
  `notes` VARCHAR(255) NOT NULL,
  `visit_start` DATE NOT NULL DEFAULT CURRENT_TIMESTAMP(),
  `visit_end` DATE NULL DEFAULT NULL,
  `vehicle_id` INT(11) NOT NULL,
  `status` ENUM('not started', 'in progress', 'ready') NOT NULL DEFAULT 'not started',
  PRIMARY KEY (`visit_id`),
  INDEX `fk_visits_vehicles1_idx` (`vehicle_id` ASC) VISIBLE,
  CONSTRAINT `fk_visits_vehicles1`
    FOREIGN KEY (`vehicle_id`)
    REFERENCES `smart_garage`.`vehicles` (`vehicle_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
AUTO_INCREMENT = 26
DEFAULT CHARACTER SET = latin1;


-- -----------------------------------------------------
-- Table `smart_garage`.`invoices`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `smart_garage`.`invoices` (
  `invoice_id` INT(11) NOT NULL AUTO_INCREMENT,
  `date` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP(),
  `due_date` DATETIME NOT NULL DEFAULT current_timestamp() + interval 10 day,
  `visit_id` INT(11) NOT NULL,
  PRIMARY KEY (`invoice_id`),
  INDEX `fk_invoices_visits1_idx` (`visit_id` ASC) VISIBLE,
  CONSTRAINT `fk_invoices_visits1`
    FOREIGN KEY (`visit_id`)
    REFERENCES `smart_garage`.`visits` (`visit_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
AUTO_INCREMENT = 2
DEFAULT CHARACTER SET = latin1;


-- -----------------------------------------------------
-- Table `smart_garage`.`parts`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `smart_garage`.`parts` (
  `part_id` INT(11) NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NOT NULL,
  `price` FLOAT NOT NULL,
  `car_segment_id` INT(11) NOT NULL,
  `is_deleted` TINYINT(4) NOT NULL DEFAULT 0,
  PRIMARY KEY (`part_id`),
  INDEX `fk_parts_car_segments1_idx` (`car_segment_id` ASC) VISIBLE,
  CONSTRAINT `fk_parts_car_segments1`
    FOREIGN KEY (`car_segment_id`)
    REFERENCES `smart_garage`.`car_segments` (`car_segment_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
AUTO_INCREMENT = 1006
DEFAULT CHARACTER SET = latin1;


-- -----------------------------------------------------
-- Table `smart_garage`.`services`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `smart_garage`.`services` (
  `service_id` INT(11) NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NOT NULL,
  `price` FLOAT NOT NULL,
  `car_segment_id` INT(11) NOT NULL,
  `is_deleted` TINYINT(4) NOT NULL DEFAULT 0,
  PRIMARY KEY (`service_id`),
  INDEX `fk_services_car_segments1_idx` (`car_segment_id` ASC) VISIBLE,
  CONSTRAINT `fk_services_car_segments1`
    FOREIGN KEY (`car_segment_id`)
    REFERENCES `smart_garage`.`car_segments` (`car_segment_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
AUTO_INCREMENT = 329
DEFAULT CHARACTER SET = latin1;


-- -----------------------------------------------------
-- Table `smart_garage`.`performed_services`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `smart_garage`.`performed_services` (
  `visit_id` INT(11) NOT NULL,
  `service_id` INT(11) NOT NULL,
  `service_qty` INT(11) NOT NULL,
  `price` FLOAT NOT NULL,
  PRIMARY KEY (`visit_id`, `service_id`),
  INDEX `fk_table1_visits1_idx` (`visit_id` ASC) VISIBLE,
  INDEX `fk_table1_services1_idx` (`service_id` ASC) VISIBLE,
  CONSTRAINT `fk_table1_services1`
    FOREIGN KEY (`service_id`)
    REFERENCES `smart_garage`.`services` (`service_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_table1_visits1`
    FOREIGN KEY (`visit_id`)
    REFERENCES `smart_garage`.`visits` (`visit_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = latin1;


-- -----------------------------------------------------
-- Table `smart_garage`.`tokens`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `smart_garage`.`tokens` (
  `token_id` INT(11) NOT NULL AUTO_INCREMENT,
  `token` VARCHAR(255) NOT NULL,
  PRIMARY KEY (`token_id`))
ENGINE = InnoDB
AUTO_INCREMENT = 97
DEFAULT CHARACTER SET = latin1;


-- -----------------------------------------------------
-- Table `smart_garage`.`used_parts`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `smart_garage`.`used_parts` (
  `visit_id` INT(11) NOT NULL,
  `part_id` INT(11) NOT NULL,
  `part_qty` INT(11) NOT NULL,
  `price` FLOAT NOT NULL,
  PRIMARY KEY (`part_id`, `visit_id`),
  INDEX `fk_used_parts_services1_idx` (`part_id` ASC) VISIBLE,
  INDEX `fk_used_parts_visits1_idx` (`visit_id` ASC) VISIBLE,
  CONSTRAINT `fk_used_parts_parts1`
    FOREIGN KEY (`part_id`)
    REFERENCES `smart_garage`.`parts` (`part_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_used_parts_visits1`
    FOREIGN KEY (`visit_id`)
    REFERENCES `smart_garage`.`visits` (`visit_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = latin1;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
