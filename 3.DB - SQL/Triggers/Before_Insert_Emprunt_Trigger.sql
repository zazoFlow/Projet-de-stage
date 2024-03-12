DROP TRIGGER IF EXISTS Before_Insert_Emprunt;

Delimiter //
create trigger Before_Insert_Emprunt Before insert On emprunt For Each Row
BEGIN
    Declare emprunted_v VARCHAR(255);
    
	Select emprunted into emprunted_v from Object Where id_Object=new.id_Object;
    
    IF emprunted_v = 'Disponible' THEN Update Object Set emprunted='Indisponible' Where id_Object=new.id_Object;
	ELSE Signal Sqlstate '45000' Set MESSAGE_TEXT='This Object is Already Emprunted';
    END IF;
END //