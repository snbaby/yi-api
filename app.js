const express = require('express');
const puppeteer = require('puppeteer')
const app = express();
let page = null
let browser = null
const sleep = function (ms) {
    return new Promise((resolve) => setTimeout(resolve, ms))
}
let log4js = require('log4js')
log4js.configure({
    appenders: { UI: { type: 'file', filename: 'electron.log' } },
    categories: { default: { appenders: ['UI'], level: 'info' } }
})

let logger = log4js.getLogger('UI')

logger.info('日志初始化成功')
//导入cors模块,该模块为跨域所用
//解析表单的插件
const bodyParser = require('body-parser');
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.post('/api/getAddresslist', (req, res) => {
    async function main () {
        try {
            await init(req.body.cookie)
            const add = await getAddressList()
            await browser.close()
            res.json({ code: 200, message: '恭喜成功',affectedRows: add })
        }catch (e) {
            console.log(e)
            await browser.close()
            res.json({ code: 500, message: '失败'})
        }
    }
    main()
})

app.post('/api/setDefAddress', (req, res) => {
    async function main () {
        try {
            await init(req.body.cookie)
            await setDefAddress(req.body.addrId)
            await browser.close()
            res.json({ code: 200, message: '恭喜成功'})
        }catch (e) {
            console.log(e)
            await browser.close()
            res.json({ code: 500, message: '失败'})
        }
    }
    main()
})

app.post('/api/addAddressData', (req, res) => {
    async function main () {
        try {
            await init(req.body.cookie)
            await createAddress(req.body)
            await browser.close()
            res.json({ code: 200, message: '恭喜成功'})
        }catch (e) {
            console.log(e)
            await browser.close()
            res.json({ code: 500, message: '失败'})
        }
    }
    main()
})

app.post('/api/partiallyRepay', (req, res) => {
    async function main () {
        console.log(req.body)
        try {
            await init(req.body.cookie)
            await partiallyRepay(req.body)
            await browser.close()
            res.json({ code: 200, message: '恭喜成功'})
        }catch (e) {
            console.log(e)
            await browser.close()
            res.json({ code: 500, message: '失败'})
        }
    }
    main()
})
app.listen(3000, () => {
    console.log('正在监听端口1000,http://0.0.0.0:3001'); //192.168.1.114换成你的ip,本机ip查询用cmd=>ipconfig
})


async function init (loginStr) {
    browser = await puppeteer.launch({
        headless: false,
        devtools: true,
        // executablePath: `${process.cwd()}\\resources\\app.asar.unpacked\\node_modules\\puppeteer\\.local-chromium\\win64-650583\\chrome-win\\chrome.exe`,
        defaultViewport: {
            width: 1280,
            height: 800,
            deviceScaleFactor: 1,
            isMobile: true,
            hasTouch: true
        }
    })
    page = await browser.newPage()
    const cookies = []
    console.log('loginStr:',loginStr)
    const loginJson = JSON.parse(loginStr)

    loginJson.data.loginCookie.forEach(temp => {
        let tempArry = temp.split(';')
        let cookieStr = tempArry[0]
        let domainStr = tempArry[1]
        const option = {
            name: cookieStr.substr(0, cookieStr.indexOf('=')),
            value: cookieStr.substr(cookieStr.indexOf('=') + 1),
            domain: domainStr.substr(domainStr.indexOf('=') + 1)
        }
        cookies.push(option)
    })
    await page.setCookie(...cookies)
}
async function getAddressList() {
    await page.setRequestInterception(true)
    let resultData = null
    page.on('request', request => {
        if (request.url().startsWith('https://h5api.m.taobao.com/h5/mtop.taobao.mbis.getdeliveraddrlist')) {
            logger.info(request.url())
            logger.info('拦截到了这条url然后就该请求了')
            page.on('response', response => {
                if (response.url().startsWith('https://h5api.m.taobao.com/h5/mtop.taobao.mbis.getdeliveraddrlist')) {
                    let message = response.text()
                    message.then(function (result) {
                        result = result.substring(result.indexOf('({') + 1).replace('})', '}')
                        result = JSON.parse(result)
                        resultData = JSON.parse(result.data.returnValue)
                    })
                }
            })
            request.continue()
        } else {
            request.continue()
        }
    })
    await page.goto('https://member1.taobao.com/member/fresh/deliver_address.htm')
    await page.waitForSelector('#myForm > div:nth-child(5) > div.next-col.next-col-19.next-form-item-control > button')
    return resultData

}
async function setDefAddress (id) {
    await page.goto('https://member1.taobao.com/member/fresh/deliver_address.htm')
    await page.waitForSelector('#container > div > div.addressList > div.next-table > table > tbody > tr.next-table-row.first > td.next-table-cell.first > div')
    const addrId = '[href=\'https://member1.taobao.com/member/fresh/deliver_address.htm?addrId='+id+'\']'
    await page.evaluate(value => {
        let node = document.querySelector(value)
        console.log(node)
        node = node.parentNode.parentNode.parentNode.nextElementSibling.firstChild.firstChild.firstChild
        node.click()
    }, addrId)
}
async function createAddress (arg) {
    // ipc.send('set-address-other', this.sizeForm)
    const self = this
    await page.goto('https://member1.taobao.com/member/fresh/deliver_address.htm')
    await page.waitForSelector('#myForm > div:nth-child(5) > div.next-col.next-col-19.next-form-item-control > button')
    let value = arg.addressArr
    const handLi = async function (value) {
        let num = await page.evaluate(value => {
            let ulArr = document.querySelectorAll('#cndzkEntrance > div:nth-child(2) > div > div > div.cndzk-entrance-division-box > ul.cndzk-entrance-division-box-content > div > li')
            let list = Array.prototype.slice.call(ulArr)
            let num = null
            list.forEach((item, index) => {
                if (item.innerText === value) {
                    num = index + 1
                }
            })
            return num
        }, value)
        if (num) {
            await page.click('#cndzkEntrance > div:nth-child(2) > div > div > div.cndzk-entrance-division-box > ul.cndzk-entrance-division-box-content > div > li:nth-child(' + num + ')')
        }
    }
    await page.click('#cndzkEntrance > div:nth-child(2) > div > div > div > div')
    await sleep(200)
    await page.click('#cndzkEntrance > div:nth-child(2) > div > div > div.cndzk-entrance-division-box > ul.cndzk-entrance-division-box-title > li:nth-child(1)')
    await sleep(200)
    await handLi(value[0])
    await sleep(200)
    await handLi(value[1])
    await sleep(200)
    await handLi(value[2])
    await sleep(200)
    await page.click('#cndzkEntrance > div:nth-child(2) > div > div > div > div')
    await page.type('#cndzkEntrance > div:nth-child(4) > div > div > textarea', arg.address, { delay: 10 })
    await page.type('#myForm > div:nth-child(1) > div.next-col.next-col-19.next-form-item-control > span > input', arg.mail, { delay: 10 })
    await page.type('#myForm > div:nth-child(2) > div.next-col.next-col-19.next-form-item-control > span > input', arg.name, { delay: 10 })
    await page.type('#myForm > div.next-row.next-form-item.next-left.next-medium.form-item-mobile > div.next-col.next-col-19.next-form-item-control > div > div.next-col.next-col-14 > div > div > span > input', arg.phone, { delay: 100 })
    await sleep(200)
    await page.click('#defaultAddress')
    await sleep(200)
    await page.click('#myForm > div:nth-child(5) > div.next-col.next-col-19.next-form-item-control > button')
}
async function partiallyRepay(arg) {
    const orderId = arg.orderId
    await page.goto('https://h5.m.taobao.com/mlapp/odetail.html?bizOrderId='+orderId)
    try {
        await sleep(3000)
        logger.info('点击代付按钮A')
        await page.tap('[aria-label="朋友代付"]')
        await sleep(500)
        await page.waitForSelector('[name=\'peerPayerEmail\']')
        logger.info('代付', arg)
        await sleep(500)
        await page.type('body > article > form > div > input[type="text"]', arg.code, { delay: 200 })
        await page.tap('body > article > form > input.btn.btn-ok')
    } catch (e) {
        logger.info('点击代付按钮B', e)
    }
}
