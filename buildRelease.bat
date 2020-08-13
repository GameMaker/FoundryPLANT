ECHO OFF
ECHO.
ECHO.
ECHO "****************************************************************************************************"
ECHO.
ECHO.

IF "%FPVERSION%"=="" GOTO NOVERSION

del module.json

setlocal enabledelayedexpansion
for /F "tokens=*" %%A in (template.module.json) do (
    set line=%%A
    set result=!line:FPVERSION=0.0.6!
    echo.!result! >> module.json
)

7z u -aoa FoundryPlant.zip @manifest

REM All is well, exit normally
GOTO :EOF

REM ERROR HANDLING
:NOVERSION
ECHO ERROR - FPVERSION is NOT defined.
GOTO :EOF
