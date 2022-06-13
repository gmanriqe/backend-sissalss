CREATE PROCEDURE sissalss.sp_cita_servicio(
	in p_json JSON,
	in p_last_ID int
)
begin
	DECLARE vJsonEsValido INT;
	DECLARE vItems INT;
	DECLARE vIndex BIGINT UNSIGNED DEFAULT 0;
	
    DECLARE vCampo2 INT;
    DECLARE vCampo3 INT;
   
	SET vJsonEsValido = JSON_VALID(p_json);

	IF vJsonEsValido = 0 THEN 
		SELECT "JSON inválido";
    ELSE 
    	-- Nuestro objeto es válido, podemos proceder
        SET vItems = JSON_LENGTH(p_json);
       	-- El objeto es válido y contiene al menos un elemento
        IF vItems > 0 THEN 
        	WHILE vIndex < vItems DO
                SET vCampo2 = JSON_EXTRACT(p_json, CONCAT('$[', vIndex, '].id_servicio'));
                SET vCampo3 = JSON_EXTRACT(p_json, CONCAT('$[', vIndex, '].id_empleado'));
                
                INSERT INTO citas_detalle(id_cita, id_servicio, id_empleado)
                values (p_last_ID, vCampo2, vCampo3);
                    
                SET vIndex = vIndex + 1;
            END WHILE;
		END IF;
	END IF;
END


call sp_cita_servicio('[
   {
      "id_cita":2,
      "id_servicio":2,
      "id_empleado":1
   },
   {
      "id_cita":2,
      "id_servicio":1,
      "id_empleado":2
   }
]', 2)