
// --------------------- Created By InCoder ---------------------
const QRTypeBtn = document.querySelectorAll(".QRTypeBtn")
oldQR = document.getElementById("qrCode")
demoQR = document.getElementById("demoQR")
inputBox = document.querySelectorAll('.inputBox')
inputTag = document.querySelectorAll('.inputTag')
textareaTag = document.querySelectorAll('.textareaTag')
textBtn = document.querySelector('.textBtn')
urlBtn = document.querySelector('.urlBtn')
emailBtn = document.querySelector('.emailBtn')
phoneBtn = document.querySelector('.phoneBtn')
smsBtn = document.querySelector('.smsBtn')

const toggleTab = (type) => {
    switch (type) {
        case "text":
            textBtn.classList.add('active')
            document.querySelector('.freeTextInput').classList.add('active')
            break;
        case "url":
            urlBtn.classList.add('active')
            document.querySelector('.urlInput').classList.add('active')
            break;
        case "email":
            emailBtn.classList.add('active')
            document.querySelector('.emailInput').classList.add('active')
            break;
        case "phone":
            phoneBtn.classList.add('active')
            document.querySelector('.phoneInput').classList.add('active')
            break;
        case "sms":
            smsBtn.classList.add('active')
            document.querySelector('.smsInput').classList.add('active')
            break;
    }
}

const downloadQRCode = (imageBase64) => {
    var a = document.createElement("a")
    a.href = imageBase64
    a.download = `QR Image ${Date.now()}.png`
    a.click()
}

QRTypeBtn.forEach((btn) => {
    btn.addEventListener('click', (e) => {
        QRTypeBtn.forEach((btn) => {
            if (btn.classList.contains('active')) {
                btn.classList.remove('active')
            }
        })
        inputBox.forEach((box) => {
            if (box.classList.contains('active')) {
                box.classList.remove('active')
            }
        })
        document.getElementById("demoText").style.display = 'block'
        document.getElementById("demoInfo").style.display = 'block'
        document.getElementById("downloadBtn").style.display = 'none'
        oldQR.innerHTML = ''
        demoQR.style.display = 'block'
        let type
        if (e.target.nodeName == "I") {
            type = e.target.parentElement.getAttribute('data-type')
        } else {
            type = e.target.getAttribute('data-type')
        }
        toggleTab(type)
    })
})

const generateQR = (text) => {
    demoQR.style.display = 'none'
    document.getElementById("demoText").style.display = 'none'
    document.getElementById("demoInfo").style.display = 'none'
    document.getElementById("downloadBtn").style.display = 'block'
    oldQR.innerHTML = ''

    let qrcode = new QRCode(document.getElementById("qrCode"), {
        text: text,
        width: 160,
        height: 160,
        colorDark: "#000",
        colorLight: "#fff",
        correctLevel: QRCode.CorrectLevel.H
    });
}

let emailData = {}
let smsData = {}

inputTag.forEach((tag) => {
    tag.addEventListener('keyup', (e) => {
        if (e.target.value == '') {
            document.getElementById("demoText").style.display = 'block'
            document.getElementById("demoInfo").style.display = 'block'
            document.getElementById("downloadBtn").style.display = 'none'
            oldQR.innerHTML = ''
            demoQR.style.display = 'block'
        } else {
            if (document.querySelector('.emailInput').classList.contains('active')) {
                Object.assign(emailData, {
                    email: document.querySelectorAll('.emailInput input')[0].value,
                    emailSubject: document.querySelectorAll('.emailInput input')[1].value
                })
            } else if (document.querySelector('.phoneInput').classList.contains('active')) {
                generateQR(`tel:${document.querySelector('.phoneInput input').value}`)
            } else if (document.querySelector('.smsInput').classList.contains('active')) {
                Object.assign(smsData, {
                    phone: document.querySelector('.smsInput input').value
                })
            } else {
                generateQR(e.target.value)
            }
        }
    })
})

textareaTag.forEach((tag) => {
    tag.addEventListener('keyup', (e) => {
        if (e.target.value == '') {
            document.getElementById("demoText").style.display = 'block'
            document.getElementById("demoInfo").style.display = 'block'
            document.getElementById("downloadBtn").style.display = 'none'
            oldQR.innerHTML = ''
            demoQR.style.display = 'block'
        } else {
            if (document.querySelector('.emailInput').classList.contains('active')) {
                Object.assign(emailData, { emailMessage: document.querySelector('.emailInput textarea').value })
                let emailQRData = `mailto:${emailData.email}?body=${emailData.emailMessage}&subject=${emailData.emailSubject}`
                if (emailData.emailSubject != undefined || emailData.email != undefined) {
                    generateQR(emailQRData)
                } else {
                    alert("First fill Email ID and Subject then fill this field. Otherwise QR Code will not be generated.")
                }
            } else if (document.querySelector('.smsInput').classList.contains('active')) {
                Object.assign(smsData, {
                    message: document.querySelector('.smsInput textarea').value
                })
                let smsQRData = `SMSTO:${smsData.phone}:${smsData.message}`
                generateQR(smsQRData)
            } else {
                generateQR(e.target.value)
            }
        }
    })
})

downloadBtn.addEventListener('click', () => {
    let imageSRC = document.getElementById("qrCode").querySelector('img').getAttribute('src')
    downloadQRCode(imageSRC)
})