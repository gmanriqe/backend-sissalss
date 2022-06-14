CREATE PROCEDURE sissalss.sp_nueva_cita(
in p_fecha_atencion date, 
in p_hora_atencion time,
in p_id_medio_pago int,
in p_id_cliente int,
out lastID int)
BEGIN
	insert into citas (fecha_atencion, hora_atencion, id_medio_pago, id_cliente)
	values (p_fecha_atencion,p_hora_atencion,p_id_medio_pago,p_id_cliente);
	SET lastID = LAST_INSERT_ID();
END