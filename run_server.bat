@echo off

for /l %%i in (1,1,14) do (
  setlocal enabledelayedexpansion
  set "dir=microservice%%i"
  if %%i lss 10 set "dir=microservice0%%i"
  if exist !dir! (
    start cmd /c "cd !dir! && npm start"
  )
)
