-- https://sauldelgado.net/parametros-json-en-stored-procedures-de-mysql/
CREATE PROCEDURE sissalss.sp_cita_servicio(
	in pParametroJson JSON
)
begin
	DECLARE vJsonEsValido INT;
	DECLARE vItems INT;
	DECLARE vIndex BIGINT UNSIGNED DEFAULT 0;
	
	DECLARE vCampo1 VARCHAR(100);
    DECLARE vCampo2 VARCHAR(100);
    DECLARE vCampo3 DECIMAL(15, 2);
   
	SET vJsonEsValido = JSON_VALID(pParametroJson);

	IF vJsonEsValido = 0 THEN 
		SELECT "JSON inválido";
    ELSE 
    	# Nuestro objeto es válido, podemos proceder
        SET vItems = JSON_LENGTH(pParametroJson);
       	# El objeto es válido y contiene al menos un elemento
        IF vItems > 0 THEN 
        	WHILE vIndex < vItems DO
                SET vCampo1 = JSON_UNQUOTE(JSON_EXTRACT(pParametroJson, CONCAT('$[', vIndex, '].campo_1')));
                SET vCampo2 = JSON_UNQUOTE(JSON_EXTRACT(pParametroJson, CONCAT('$[', vIndex, '].campo_2')));
                SET vCampo3 = JSON_EXTRACT(pParametroJson, CONCAT('$[', vIndex, '].campo_3'));
                
                INSERT INTO citas_detalle(id_cita, id_servicio, id_empleado)
                values (vCampo1, vCampo2, vCampo3);
                    
                SET vIndex = vIndex + 1;
            END WHILE;
		END IF;
	END IF;
END