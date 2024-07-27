
CREATE DATABASE IF NOT EXISTS `barberia_app`
USE `barberia_app`;

CREATE TABLE IF NOT EXISTS `citas` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `fecha` date NOT NULL,
  `hora` time NOT NULL,
  `usuarioId` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_citas_usuarios` (`usuarioId`),
  CONSTRAINT `FK_citas_usuarios` FOREIGN KEY (`usuarioId`) REFERENCES `usuarios` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf16 COLLATE=utf16_spanish_ci;


CREATE TABLE IF NOT EXISTS `citasservicios` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `citaId` int(11) NOT NULL,
  `servicioId` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_citasservicios_citas` (`citaId`),
  KEY `FK_citasservicios_servicios` (`servicioId`),
  CONSTRAINT `FK_citasservicios_servicios` FOREIGN KEY (`servicioId`) REFERENCES `servicios` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf16 COLLATE=utf16_spanish_ci;


CREATE TABLE IF NOT EXISTS `servicios` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(60) COLLATE utf16_spanish_ci NOT NULL,
  `precio` decimal(5,3) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf16 COLLATE=utf16_spanish_ci;


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

CREATE TABLE IF NOT EXISTS `planilla` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `usuario_id` int(11) NOT NULL,
  `cita_id` int(11) NOT NULL,
  `nombre` varchar(60) COLLATE utf16_spanish_ci NOT NULL,
  `fecha` date NOT NULL,
  `cc` varchar(20) COLLATE utf16_spanish_ci NOT NULL,
  `edad` int(3) NOT NULL,
  `fechaNacimiento` date NOT NULL,
  `estadoCivil` varchar(20) COLLATE utf16_spanish_ci NOT NULL,
  `contactoPersonal` varchar(60) COLLATE utf16_spanish_ci NOT NULL,
  `motivoConsulta` varchar(255) COLLATE utf16_spanish_ci NOT NULL,
  `patologiaActual` varchar(255) COLLATE utf16_spanish_ci NOT NULL,
  `fechaUltimoPeriodo` date DEFAULT NULL,
  `regularidadPeriodo` enum('Regular', 'Irregular') COLLATE utf16_spanish_ci NOT NULL,
  `metodoPlanificacion` varchar(60) COLLATE utf16_spanish_ci NOT NULL,
  PRIMARY KEY (`id`),
  FOREIGN KEY (`usuario_id`) REFERENCES `usuarios`(`id`) ON DELETE CASCADE,
  FOREIGN KEY (`cita_id`) REFERENCES `citas`(`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf16 COLLATE=utf16_spanish_ci;
