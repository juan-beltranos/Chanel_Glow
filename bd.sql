-- --------------------------------------------------------
-- Host:                         127.0.0.1
-- Versión del servidor:         5.7.33 - MySQL Community Server (GPL)
-- SO del servidor:              Win64
-- HeidiSQL Versión:             11.2.0.6213
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


-- Volcando estructura de base de datos para barberia_app
CREATE DATABASE IF NOT EXISTS `barberia_app` /*!40100 DEFAULT CHARACTER SET utf16 COLLATE utf16_spanish_ci */;
USE `barberia_app`;

-- Volcando estructura para tabla barberia_app.citas
CREATE TABLE IF NOT EXISTS `citas` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `fecha` date NOT NULL,
  `hora` time NOT NULL,
  `usuarioId` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_citas_usuarios` (`usuarioId`),
  CONSTRAINT `FK_citas_usuarios` FOREIGN KEY (`usuarioId`) REFERENCES `usuarios` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf16 COLLATE=utf16_spanish_ci;

-- La exportación de datos fue deseleccionada.

-- Volcando estructura para tabla barberia_app.citasservicios
CREATE TABLE IF NOT EXISTS `citasservicios` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `citaId` int(11) NOT NULL,
  `servicioId` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_citasservicios_citas` (`citaId`),
  KEY `FK_citasservicios_servicios` (`servicioId`),
  CONSTRAINT `FK_citasservicios_servicios` FOREIGN KEY (`servicioId`) REFERENCES `servicios` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf16 COLLATE=utf16_spanish_ci;

-- La exportación de datos fue deseleccionada.

-- Volcando estructura para tabla barberia_app.servicios
CREATE TABLE IF NOT EXISTS `servicios` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(60) COLLATE utf16_spanish_ci NOT NULL,
  `precio` decimal(5,3) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf16 COLLATE=utf16_spanish_ci;

-- La exportación de datos fue deseleccionada.

-- Volcando estructura para tabla barberia_app.usuarios
CREATE TABLE IF NOT EXISTS `usuarios` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(60) COLLATE utf16_spanish_ci NOT NULL,
  `apellido` varchar(60) COLLATE utf16_spanish_ci NOT NULL,
  `email` varchar(60) COLLATE utf16_spanish_ci NOT NULL,
  `contraseña` varchar(60) COLLATE utf16_spanish_ci NOT NULL,
  `telefono` varchar(15) COLLATE utf16_spanish_ci NOT NULL,
  `admin` tinyint(1) NOT NULL DEFAULT '0',
  `confirmado` tinyint(1) DEFAULT '0',
  `token` varchar(15) COLLATE utf16_spanish_ci DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf16 COLLATE=utf16_spanish_ci;

-- La exportación de datos fue deseleccionada.

/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
