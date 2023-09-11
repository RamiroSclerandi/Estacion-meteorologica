#!/usr/bin/env python3
import datetime
import time
import requests
import os
import csv
import firebase_admin
from firebase_admin import firestore
import Adafruit_DHT 
from bmp280 import BMP280
try:
       from smbus2 import SMBus
except ImportError:
       from smbus import SMBus

# Se debe definir la ruta donde se encontrará el archivo con las credenciales para acceder a firestore
credential_path = "/credenciales.json" 
os.environ['GOOGLE_APPLICATION_CREDENTIALS'] = credential_path

bus = SMBus(1)
bmp280 = BMP280(i2c_dev=bus)
sensor = Adafruit_DHT.DHT11 
pin = 4 

humedad, temperatura1 = Adafruit_DHT.read_retry(sensor, pin)
temperatura2 = bmp280.get_temperature()
presion = bmp280.get_pressure()
temperatura_f = "{:.2f}".format(temperatura2)
presion_f = "{:.2f}".format(presion)
temperatura_f2 = float(temperatura_f)
presion_f2 = float(presion_f)

while (temperatura_f2 == 27.21 or presion_f2 == 789.9):
    temperatura2 = bmp280.get_temperature()
    temperatura_f = "{:.2f}".format(temperatura2)
    temperatura_f2 = float(temperatura_f)
    presion = bmp280.get_pressure()
    presion_f = "{:.2f}".format(presion)
    presion_f2 = float(presion_f)
    
bus.close()

#print('Temperatura = ' + temperatura_f + '°C')
#print('Presion = ' + presion_f + ' hPa')
#print('Humedad = ' + str(humedad) + '%')

fecha = datetime.datetime.now().date() 
hora = datetime.datetime.now().hour 
fechaStr = fecha.strftime('%Y-%m-%d')
dia = datetime.datetime.now().weekday() 

if (hora == 0):
    medicion = 1
elif (hora == 3):
    medicion = 2
elif (hora == 6):
    medicion = 3
elif (hora == 9):
    medicion = 4
elif (hora == 12):
    medicion = 5
elif (hora == 15):
    medicion = 6
elif (hora == 18):
    medicion = 7
elif (hora == 21):
    medicion = 8

medicionStr = str(medicion)

if (dia == 0):
    diaSemana = "lunes"
elif (dia == 1):
    diaSemana = "martes"
elif (dia == 2):
    diaSemana = "miercoles"
elif (dia == 3):
    diaSemana = "jueves"
elif (dia == 4):
    diaSemana = "viernes"
elif (dia == 5):
    diaSemana = "sabado"
elif (dia == 6):
    diaSemana = "domingo"

api_key = '42c9755d21ff5cba69994ffd4bcee526'
lat = -30.946440739126878
lon = -61.55767174860309
url = f'http://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={api_key}&units=metric'
response = requests.get(url)
data = response.json()
temperaturaApi = data['main']['temp']
presionApi = data['main']['pressure']
humedadApi = data['main']['humidity']

datos = {
    "temperatura": temperatura_f2,
    "humedad": humedad,
    "presion": presion_f2,
    "temperaturaApi": temperaturaApi,
    "humedadApi": humedadApi,
    "presionApi": presionApi, 
    "fecha": fechaStr, 
    "hora": hora
}

rutaAbsolutaArchivo = '/home/pi/Desktop/proyecto_ic2/'
archivo = 'mediciones.csv'
rutaCompletaArchivo = os.path.join(rutaAbsolutaArchivo, archivo)
existencia = os.path.exists(rutaCompletaArchivo)
with open(rutaCompletaArchivo, 'a') as f:
    writer = csv.writer(f)
    if (existencia != True):
        writer.writerow(datos.keys()) 
    writer.writerow(datos.values())
    
app = firebase_admin.initialize_app()
db = firestore.client()
nombre = diaSemana + " " + fechaStr + " nro " + medicionStr

doc_ref = db.collection("mediciones").document(nombre)
doc_ref.set(datos)