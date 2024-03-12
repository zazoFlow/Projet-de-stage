DROP TRIGGER IF EXISTS Before_Update_Emprunt;

Delimiter //
create trigger Before_Update_Emprunt Before update On emprunt For Each Row
BEGIN
	IF lower(old.Status) = 'annuler' or lower(old.Status) = 'retourner' THEN
		SIGNAL SQLSTATE '45000' Set MESSAGE_TEXT = 'Cette Emprunt Est Finit. Tu ne peux pas Changer Le Status';
    ELSEIF lower(new.Status) = 'annuler' or lower(new.Status) = 'retourner' THEN
		Update Object Set emprunted='Disponible' Where id_Object=old.id_Object;
    END IF;
END //