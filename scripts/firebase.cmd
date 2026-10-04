@echo off
rem Run the installed Firebase CLI with Node 22 to avoid the Windows Node 24 exit crash.
rem The isolated runtime is cached inside this project; system Node is unchanged.
call npx.cmd --yes --package=node@22 --cache="%~dp0..\.npm-cache" node "%APPDATA%\npm\node_modules\firebase-tools\lib\bin\firebase.js" %*
exit /b %errorlevel%
