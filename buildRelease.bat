ECHO OFF
REM HOW FOUNDRY DETERMINES IF THERE IS AN UPDATE (per cole@ on Discord)
REM It determines whether there's an update by comparing the "version" key in the local module.json to the 
REM "version" key in the module.json that's pointed to by the "manifest" key of the local module.json (which 
REM should be "stable" and always point to the latest version, usually the master branch). From what I can see 
REM comparing your 0.0.7 tag module.json and the master branch module.json it seems like you've got it set up correct
REM
REM Note - if it doesn't 'take' right away, try CTRL+F5
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
    set result=!line:FPVERSION=%FPVERSION%!
    echo.!result! >> module.json
)

for /F "tokens=*" %%A in (templates\needs-list.html.template) do (
    set line=%%A
    set result=!line:FPVERSION=%FPVERSION%!
    echo.!result! >> templates\needs-list.html
)

7z u -aoa FoundryPlant.zip @manifest

git tag %FPVERSION%

git push origin master

git push origin --tags

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
ECHO Use "set FPVERSION=x.y.z" where x, y, z are major, minor, count version numbers.
ECHO Check the most recent version on github to see where to start.
GOTO :EOF
