import subprocess

print("Initialize microservice01 image")
process = subprocess.run('cd microservice01 && docker build -t microservice01:1.0 .', shell=True);
print("Run microservice01 container")
process = subprocess.run('docker run -d -p 8000:8000 microservice01:1.0', shell=True);

# print("Initialize and run microservice02 image")
# process = subprocess.run('cd microservice02 && docker compose up', shell=True);


print("Initialize microservice02 image")
process = subprocess.run('cd microservice02 && docker build -t microservice02:1.0 .', shell=True);
print("Run microservice02 container")
process = subprocess.run('docker run -d -p 3001:3001 microservice02:1.0', shell=True);

print("Initialize microservice03 image")
process = subprocess.run('cd microservice03 && docker build -t microservice03:1.0 .', shell=True);
print("Run microservice03 container")
process = subprocess.run('docker run -d -p 3002:3002 microservice03:1.0', shell=True);

print("Initialize microservice04 image")
process = subprocess.run('cd microservice04 && docker build -t microservice04:1.0 .', shell=True);
print("Run microservice04 container")
process = subprocess.run('docker run -d -p 3003:3003 microservice04:1.0', shell=True);

print("Initialize microservice05 image")
process = subprocess.run('cd microservice05 && docker build -t microservice05:1.0 .', shell=True);
print("Run microservice05 container")
process = subprocess.run('docker run -d -p 3004:3004 microservice05:1.0', shell=True);

print("Initialize microservice06 image")
process = subprocess.run('cd microservice06 && docker build -t microservice06:1.0 .', shell=True);
print("Run microservice06 container")
process = subprocess.run('docker run -d -p 3005:3005 microservice06:1.0', shell=True);

print("Initialize microservice07 image")
process = subprocess.run('cd microservice07 && docker build -t microservice07:1.0 .', shell=True);
print("Run microservice07 container")
process = subprocess.run('docker run -d -p 3006:3006 microservice07:1.0', shell=True);

print("Initialize microservice08 image")
process = subprocess.run('cd microservice08 && docker build -t microservice08:1.0 .', shell=True);
print("Run microservice08 container")
process = subprocess.run('docker run -d -p 3007:3007 microservice08:1.0', shell=True);

print("Initialize microservice09 image")
process = subprocess.run('cd microservice09 && docker build -t microservice09:1.0 .', shell=True);
print("Run microservice09 container")
process = subprocess.run('docker run -d -p 3008:3008 microservice09:1.0', shell=True);

# print("Initialize and run microservice10 image")
# process = subprocess.run('cd microservice10 && docker compose up', shell=True);

# print("Initialize and run microservice11 image")
# process = subprocess.run('cd microservice11 && docker compose up', shell=True);

print("Initialize microservice10 image")
process = subprocess.run('cd microservice10 && docker build -t microservice10:1.0 .', shell=True);
print("Run microservice10 container")
process = subprocess.run('docker run -d -p 3009:3009 microservice10:1.0', shell=True);

print("Initialize microservice11 image")
process = subprocess.run('cd microservice11 && docker build -t microservice11:1.0 .', shell=True);
print("Run microservice11 container")
process = subprocess.run('docker run -d -p 3010:3010 microservice11:1.0', shell=True);