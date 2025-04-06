const readline = require('readline');
const crypto = require('crypto');
const fs = require('fs');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const filename = 'public_key';

function showMenu() {
    console.log('\n=== Digital Signature App ===');
    console.log('1. Generate Digital Signature');
    console.log('2. Verify Digital Signature');
    console.log('3. Exit');
    console.log('==========================\n');

    rl.question('Select an option (1-3): ', (option) => {
        switch (option) {
            case '1':
                generateSignature();
                break;
            case '2':
                verifySignature();
                break;
            case '3':
                console.log('Goodbye!');
                rl.close();
                break;
            default:
                console.log('Invalid option. Please try again.');
                showMenu();
        }
    });
}

let currentSignature = '';
let currentMessage = '';

function generateSignature() {
    rl.question('Ingresa el mensaje a firmar: ', (message) => {
            // Generate key pair
            const { privateKey, publicKey } = crypto.generateKeyPairSync('rsa', {
                modulusLength: 2048,
            });

            // Create signature
            const sign = crypto.createSign('SHA256');
            sign.update(message);
            const signature = sign.sign(privateKey, 'base64');

            // Save public key to file
            const publicKeyPem = publicKey.export({ type: 'pkcs1', format: 'pem' });
            fs.writeFileSync(`keys/${filename}.pem`, publicKeyPem);

            // Save current signature and message
            currentSignature = signature;
            currentMessage = message;


            console.log('\Mensaje:', message);
            console.log('Firma:', signature);
            console.log('Public Key guardado:', `${filename}.pem`);
            
            showMenu();
    });
}

function verifySignature() {
    rl.question('Ingresa el mensaje a verificar: ', (message) => {
        if (!currentSignature || !currentMessage) {
        console.log('\nPrimero genera la firma (Option 1)');
        showMenu();
        return;
    }

    console.log('\nVerificando la ultima firma:');
    console.log('Message:', message);

    try {
        const publicKey = fs.readFileSync(`keys/${filename}.pem`, 'utf8');
        const verify = crypto.createVerify('SHA256');
        verify.update(message);
        const isValid = verify.verify(publicKey, currentSignature, 'base64');
        console.log("🚀 ~ rl.question ~ isValid:", isValid)

        console.log('\nResultado de la verificacion de la firma:', isValid ? 'Valid ✓' : 'Invalid ✗');
    } catch (error) {
        console.log('Error verifying signature:', error.message);
    }
    showMenu();
    })
    
}

// Start the application
showMenu();