@echo off

if "%1"=="node" goto node
if "%1"=="mongodb" goto mongodb
if "%1"=="css" goto css

:node
REM run node server
node %~dp0..\server\nodejs\index.js
goto :eof

:mongodb
REM start mongodb
"E:\Program Files\mongoDB\bin\mongod.exe"  --dbpath=%~dp0Data
goto :eof

:css
REM Compile scss 
REM node-sass -wro css scss
node-sass --watch --recursive --output .\static\app\src\css .\static\app\src\scss
goto :eof

pause