DECLARE @EffectiveTaxSettingID INT;
DECLARE @TaxRate FLOAT;

-- Get the most recent effective tax setting
SELECT TOP 1
    @EffectiveTaxSettingID = TaxSettingID,
    @TaxRate = TaxPercentage
FROM TaxSetting
WHERE EffectiveDate <= GETDATE()
ORDER BY EffectiveDate DESC;

-- If no effective tax setting is found, use default tax rate
IF @EffectiveTaxSettingID IS NULL
BEGIN
    SET @TaxRate = 0.1;
    -- Optionally, insert a default tax setting record if not exists
    -- INSERT INTO TaxSetting (TaxPercentage, EffectiveDate, UpdateDate)
    -- VALUES (0.1, '1900-01-01', GETDATE());
    -- SELECT @EffectiveTaxSettingID = SCOPE_IDENTITY();
END

-- Insert new tax report
INSERT INTO TaxReport (CreateDate, TaxRate, TaxCode, TaxSettingID, RevenueID, InstructorID)
VALUES (GETDATE(), @TaxRate, 'TAXCODE123', @EffectiveTaxSettingID, 1, 1); -- Replace 1, 1 with actual RevenueID and InstructorID