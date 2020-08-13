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

git tag %FPVERSION%

git push origin master

ECHO.
ECHO.SUCCESS
ECHO.
ECHO.Now create a release in github using tag %FPVERSION%, and attach FoundryPlant.zip.
ECHO.

REM All is well, exit normally
GOTO :EOF

REM ERROR HANDLING
:NOVERSION
ECHO ERROR - FPVERSION is NOT defined.
ECHO use "set FPVERSION=x.y.z" where x, y, z are major, minor, count version numbers.
GOTO :EOF
