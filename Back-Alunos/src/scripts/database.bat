@echo off
setlocal enabledelayedexpansion

echo Current working directory: %cd%
echo Looking for .env file at: ..\..\..env

for /f "tokens=1,2 delims==" %%a in ('findstr /r "^[^#]" ..\..\..env') do (
    set %%a=%%b
)

if "%DATABASE_USER%"=="" (
    echo DATABASE_USER is not set.
    exit /b 1
)
if "%DATABASE_PASSWORD%"=="" (
    echo DATABASE_PASSWORD is not set.
    exit /b 1
)
if "%DATABASE_HOST%"=="" (
    echo DATABASE_HOST is not set.
    exit /b 1
)
if "%DATABASE_PORT%"=="" (
    echo DATABASE_PORT is not set.
    exit /b 1
)
if "%DATABASE_NAME%"=="" (
    echo DATABASE_NAME is not set.
    exit /b 1
)

mysql -u %DATABASE_USER% -p%DATABASE_PASSWORD% -h %DATABASE_HOST% -P %DATABASE_PORT% -e "SHOW DATABASES LIKE '%DATABASE_NAME%';" | findstr /r /c:"%DATABASE_NAME%"
if %errorlevel%==0 (
    echo Database '%DATABASE_NAME%' already exists. Skipping creation.
    exit /b 0
)

mysql -u %DATABASE_USER% -p%DATABASE_PASSWORD% -h %DATABASE_HOST% -P %DATABASE_PORT% -e "CREATE DATABASE %DATABASE_NAME%;"

if %errorlevel%==0 (
    echo Database '%DATABASE_NAME%' created successfully.
) else (
    echo Failed to create database '%DATABASE_NAME%'.
    exit /b 1
)