const mercadoPagoPublicKey = document.getElementById("mercado-pago-public-key").value;
const mercadopago = new MercadoPago(mercadoPagoPublicKey);
let cardPaymentBrickController;

async function loadPaymentForm() {
    //const productCost = document.getElementById('amount').value;
    const productCost = 50;
    const settings = {
        initialization: {
            amount: productCost,
        },
        callbacks: {
            onReady: () => {
                console.log('brick ready')
            },
            onError: (error) => {
                alert(JSON.stringify(error))
            },
            onSubmit: (cardFormData) => {
                proccessPayment(cardFormData)
            }
        },
        locale: 'es-AR',
        customization: {
            paymentMethods: {
                "installments": 0
            },
            visual: {
                style: {
                    theme: 'dark',
                    customVariables: {
                        formBackgroundColor: '#1d2431',
                        baseColor: 'aquamarine'
                    }
                }
            }
        },
    }

    const bricks = mercadopago.bricks();
    cardPaymentBrickController = await bricks.create('cardPayment', 'mercadopago-bricks-contaner__PaymentCard', settings);
};

const proccessPayment = (cardFormData) => {
    fetch("/process_payment", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(cardFormData),
    })
    .then(response => {
        return response.json();
    })
    .then(result => {
        if(!result.hasOwnProperty("error_message")) {
            document.getElementById("payment-id").innerText = result.id;
            document.getElementById("payment-status").innerText = result.status;
            document.getElementById("payment-detail").innerText = result.detail;
            $('.container__payment').fadeOut(500);
            setTimeout(() => { $('.container__result').show(500).fadeIn(); }, 500);
        } else {
            alert(JSON.stringify({
                status: result.status,
                message: result.error_message
            }))
        }
    })
    .catch(error => {
        alert("Unexpected error\n"+JSON.stringify(error));
    });
}

