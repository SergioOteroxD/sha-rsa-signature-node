# Aplicación de Firma Digital

Esta es una aplicación de línea de comandos que permite generar y verificar firmas digitales utilizando el algoritmo RSA y SHA256.

## Características

- Generación de firmas digitales
- Verificación de firmas digitales
- Generación automática de par de claves RSA (2048 bits)
- Almacenamiento de clave pública en archivo

## Requisitos

- Node.js
- npm

## Instalación

1. Clona este repositorio
2. Asegúrate de tener una carpeta `keys` en el directorio raíz del proyecto:
```bash
mkdir keys  
```
## Uso
Para ejecutar la aplicación:

```bash
node src/index.js
 ```

### Menú Principal
La aplicación presenta un menú interactivo con las siguientes opciones:

1. Generar Firma Digital
   
   - Solicita un mensaje para firmar
   - Genera un nuevo par de claves RSA
   - Crea la firma digital
   - Guarda la clave pública en keys/public_key.pem
   - Muestra el mensaje y la firma generada
2. Verificar Firma Digital
   
   - Solicita el mensaje a verificar
   - Verifica la firma utilizando la clave pública almacenada
   - Muestra el resultado de la verificación
3. Salir
   
   - Cierra la aplicación
## Detalles Técnicos
- Algoritmo de Firma : RSA
- Hash : SHA256
- Longitud de Clave : 2048 bits
- Formato de Clave Pública : PEM (PKCS#1)
- Codificación de Firma : Base64
## Notas Importantes
- La aplicación mantiene la última firma y mensaje en memoria
- Es necesario generar una firma antes de poder verificar
- La clave pública se guarda en el directorio keys