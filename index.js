const {
    WAConnection,
    MessageType,
    ReconnectMode,
    Presence,
    Mimetype,
    rugaapi,
    GroupSettingChange
} = require('@adiwajshing/baileys')


const { color, bgcolor } = require('./lib/color')
const { bahasa } = require('./src/bahasa')
const { negara } = require('./src/kodenegara')
const { virtex } = require('./src/virtex')
const { wait, pegatinas, musica, simih, getBuffer, h2k, generateMessageID, getGroupAdmins, getRandom, banner, start, info, success, close } = require('./lib/functions')
const { fetchJson } = require('./lib/fetcher')
const { recognize } = require('./lib/ocr')

const fs = require('fs')
const moment = require('moment-timezone')
const { exec } = require('child_process')
const kagApi = require('@kagchi/kag-api')
const axios = require("axios")
const fetch = require('node-fetch')

const ffmpeg = require('fluent-ffmpeg')
const { removeBackgroundFromImageFile } = require('remove.bg')

const speed = require('performance-now')

const welkom = JSON.parse(fs.readFileSync('./database/json/welkom.json'))

const ban = JSON.parse(fs.readFileSync('./database/banned.json'))
const setting = JSON.parse(fs.readFileSync('./src/settings.json'))
const samih = JSON.parse(fs.readFileSync('./database/json/simi.json'))
const user = JSON.parse(fs.readFileSync('./database/json/user.json'))


const { help } = require('./src/help')
const { logomaker } = require('./database/menu/logomaker')

const { antimenu } = require('./src/antimenu')
const { welmenu } = require('./src/welmenu')
const { banmenu } = require('./src/banmenu')

const vcard = 'BEGIN:VCARD\n' 
            + 'VERSION:3.0\n' 
            + 'FN:Diana\n' 
            + 'ORG:Diana;\n' 
			+ 'TEL;type=CELL;type=VOICE;waid=37122207225:+371 22 207 225\n\n' 
            + 'END:VCARD'


prefix = '*'
blocked = []
banChats = false


const settingan = JSON.parse(fs.readFileSync('./admin/set.json'))
const {
	author,
pack 
} = settingan



const antilink = JSON.parse(fs.readFileSync('./src/antilink.json'))
const antiface = JSON.parse(fs.readFileSync('./src/antiface.json'))
const antitik = JSON.parse(fs.readFileSync('./src/antitik.json'))
const antinsta = JSON.parse(fs.readFileSync('./src/antinsta.json'))
const antikwai = JSON.parse(fs.readFileSync('./src/antikwai.json'))
const antiwa = JSON.parse(fs.readFileSync('./src/antiwa.json'))
const antidiscord = JSON.parse(fs.readFileSync('./src/antidiscord.json'))	
function addMetadata(packname, author) {	
	if (!packname) packname = 'Bot-Diana'; if (!author) author = 'DianaNoa';	
	author = author.replace(/[^a-zA-Z0-9]/g, '');	
	let name = `${author}_${packname}`
	if (fs.existsSync(`./${name}.exif`)) return `./${name}.exif`
	const json = {	
		"sticker-pack-name": packname,
		"sticker-pack-publisher": author,
	}
	const littleEndian = Buffer.from([0x49, 0x49, 0x2A, 0x00, 0x08, 0x00, 0x00, 0x00, 0x01, 0x00, 0x41, 0x57, 0x07, 0x00])	
	const bytes = [0x00, 0x00, 0x16, 0x00, 0x00, 0x00]	

	let len = JSON.stringify(json).length	
	let last	

	if (len > 256) {	
		len = len - 256	
		bytes.unshift(0x01)	
	} else {	
		bytes.unshift(0x00)	
	}	

	if (len < 16) {	
		last = len.toString(16)	
		last = "0" + len	
	} else {	
		last = len.toString(16)	
	}	

	const buf2 = Buffer.from(last, "hex")	
	const buf3 = Buffer.from(bytes)	
	const buf4 = Buffer.from(JSON.stringify(json))	

	const buffer = Buffer.concat([littleEndian, buf2, buf3, buf4])	

	fs.writeFile(`./${name}.exif`, buffer, (err) => {	
		return `./${name}.exif`	
	})	

} 
	
function kyun(seconds){
  function pad(s){
    return (s < 10 ? '0' : '') + s;
  }
  var hours = Math.floor(seconds / (60*60));
  var minutes = Math.floor(seconds % (60*60) / 60);
  var seconds = Math.floor(seconds % 60);

  
  return `${pad(hours)} Horas ${pad(minutes)} Minutos ${pad(seconds)} Segundos`
}

async function starts() {
	const client = new WAConnection()
	client.version = [2, 2147, 14]
	client.autoReconnect = ReconnectMode.onConnectionLost;
        client.logger.level = 'warn'
	console.log(banner.string)
	client.on('qr', () => {
		console.log(color('[','white'), color('!','red'), color(']','white'), color('Escanea el codigo no te tardes'))
	})

	fs.existsSync('./Nazwa.json') && client.loadAuthInfo('./Nazwa.json')
	client.on('connecting', () => {
		start('2', 'desconectado')
	})
	client.on('open', () => {
		success('2', 'Conectado bot-diana')
	})
	await client.connect({timeoutMs: 30*1000})
        fs.writeFileSync('./Nazwa.json', JSON.stringify(client.base64EncodedAuthInfo(), null, '\t'))

	client.on('group-participants-update', async (anu) => {
		if (!welkom.includes(anu.jid)) return
		try {
			const mdata = await client.groupMetadata(anu.jid)
			console.log(anu)
			if (anu.action == 'add') {
				num = anu.participants[0]
				teks = `hola!! @${num.split('@')[0]} ¿como estas?\n\n『Bienvenido A *${mdata.subject}*』\n\nUn gusto conocerte amig@ \n\n_Recuerda leer las reglas del grupo para no tener ningun problema _\n\n*Solo disfrutar de este grupo y divertite *`
                          client.sendMessage(mdata.id, teks, MessageType.text, { contextInfo: {"mentionedJid": [num]}})
			} else if (anu.action == 'remove') {
				num = anu.participants[0]
				teks = `Bueno, se fue @${num.split('@')[0]} 👋\n\nQue dios lo bendiga `
				client.sendMessage(mdata.id, teks, MessageType.text, {contextInfo: {"mentionedJid": [num]}})
			}
		} catch (e) {
			console.log('Error: %s', color(e, 'red'))
		}
	})

		client.on('CB:Blocklist', json => {
            if (blocked.length > 2) return
	    for (let i of json[1].blocklist) {
	    	blocked.push(i.replace('c.us','s.whatsapp.net'))
	    }
	})

	client.on('chat-update', async (mek) => {
		try {
                        if (!mek.hasNewMessage) return
                        mek = JSON.parse(JSON.stringify(mek)).messages[0]
			if (!mek.message) return
			if (mek.key && mek.key.remoteJid == 'status@broadcast') return
			if (mek.key.fromMe) return
			global.prefix
			global.blocked
			const content = JSON.stringify(mek.message)
			const apikey = setting.apikey
			const from = mek.key.remoteJid
			const type = Object.keys(mek.message)[0]
			const { text, extendedText, contact, location, liveLocation, image, video, sticker, document, audio, product } = MessageType
			const time = moment.tz('America/Argentina').format('HH:mm:ss')
			const date = moment.tz('America/Argentina').format('DD/MM/YY')
			body = (type === 'conversation' && mek.message.conversation.startsWith(prefix)) ? mek.message.conversation : (type == 'imageMessage') && mek.message.imageMessage.caption.startsWith(prefix) ? mek.message.imageMessage.caption : (type == 'videoMessage') && mek.message.videoMessage.caption.startsWith(prefix) ? mek.message.videoMessage.caption : (type == 'extendedTextMessage') && mek.message.extendedTextMessage.text.startsWith(prefix) ? mek.message.extendedTextMessage.text : ''
			budy = (type === 'conversation') ? mek.message.conversation : (type === 'extendedTextMessage') ? mek.message.extendedTextMessage.text : ''
			const command = body.slice(1).trim().split(/ +/).shift().toLowerCase()
			const args = body.trim().split(/ +/).slice(1)
			let authorname = client.contacts[from] != undefined ? client.contacts[from].vname || client.contacts[from].notify : undefined
			const isCmd = body.startsWith(prefix)

			mess = {
				wait: 'estoy procesando\n\n❗Por favor no hacer spam\n\n_*bot-Diana*_',
				success: '✔️ Listo ✔️',
                                
				foto: 'estoy cambiando la foto del grupo\n\nPor favor no hacer spam\n\n_*bot-Diana*_',
				unir: 'Espere por favor 🕖\n\nEstoy tratando de unirlo\n\n*Recuerda, si no lo uno es por que el usuario tiene bloqueado la funcion para unirlo a grupos*\n\n_*bot-diana*_',
				error: {
					stick: '[❎] Falló, se produjo un error al convertir la imagen en un sticker',
					unire: 'Por favor, no coloques (+) solo pon el numero con el codigo de area de su pais\n\nEjemplo: *unir 52xxxxxxxxx',
					Iv: 'Este no es un link de youtube'
					},
				only: {
					group: '[❗] Este comando es solo para grupos',
					ownerG: '[❗] Este comando solo puede ser utilizado por un admins del grupo',
					ownerB: '[❗] Este comando solo lo usa bot-diana',
					admin: '[❗] Este comando solo puede ser utilizado por administradores del grupo',
					Badmin: '[❗] Este comando solo se puede usar cuando el bot se convierte en administrador',
                    pegatina: 'estoy haciendo tu sticker \n\n*Recuerda los stickersgif son de 6 segundos*\n\n_*Bot-Diana*_',
					attp: 'estoy haciendo tu texto a sticker \n\n*Esto puede demorar unos minutos*\n\n_*bot-diana*_',
					imgs: 'espera...\n\n*Convirtiendo tu Sticker a Imagen 🔄*\n\n_*bot-diana*_',
					daftarB: `\nNo estas en mi lista de datos \n\nPara poder usarme escribe el siguente comando\n\nComando: ${prefix}daftar Nombre\nEjemplo: ${prefix}daftar Diana`,
				}
			}
    			const apakah = ['Si','No']
                        const kapankah = ['Otro día','Otra semana','Otro mes','Otro año']
			const botNumber = client.user.jid
			const ownerNumber = ["37122207225@s.whatsapp.net"]
			const nomorOwner = [ownerNumber]
	                const isGroup = from.endsWith('@g.us')
			const totalchat = await client.chats.all()
			const sender = isGroup ? mek.participant : mek.key.remoteJid
			const groupMetadata = isGroup ? await client.groupMetadata(from) : ''
			const isBanned = ban.includes(sender)
			const groupName = isGroup ? groupMetadata.subject : ''
			const isAntiLink = isGroup ? antilink.includes(from) : false
			const isAntiDiscord = isGroup ? antidiscord.includes(from) : false
			const isAntInsta = isGroup ? antinsta.includes(from) : false
			const isAntiTik = isGroup ? antitik.includes(from) : false
			const isAntiFace = isGroup ? antiface.includes(from) : false
			const isAntiKwai = isGroup ? antikwai.includes(from) : false
			const isAntiWa = isGroup ? antiwa.includes(from) : false
			const groupId = isGroup ? groupMetadata.jid : ''
			const groupMembers = isGroup ? groupMetadata.participants : ''
                        const groupAdmins = isGroup ? getGroupAdmins(groupMembers) : ''
			const isBotGroupAdmins = groupAdmins.includes(botNumber) || false
			const isGroupAdmins = groupAdmins.includes(sender) || false
			const isWelkom = isGroup ? welkom.includes(from) : false
			const isSimi = isGroup ? samih.includes(from) : false
			const isOwner = ownerNumber.includes(sender)
                        const isUser = user.includes(sender)
                        const isLevelingOn = isGroup ? _leveling.includes(groupId) : false
			const NomerOwner = '37122207225@s.whatsapp.net'
                        const conts = mek.key.fromMe ? client.user.jid : client.contacts[sender] || { notify: jid.replace(/@.+/, '') }
                        const pushname = mek.key.fromMe ? client.user.name : conts.notify || conts.vname || conts.name || '-'
			
			
			
			const isUrl = (url) => {
			    return url.match(new RegExp(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&/=]*)/, 'gi'))
			}
			const reply = (teks) => {
				client.sendMessage(from, teks, text, {quoted:mek})
			}
			const sendMess = (hehe, teks) => {
				client.sendMessage(hehe, teks, text)
			}
			const mentions = (teks, memberr, id) => {
				(id == null || id == undefined || id == false) ? client.sendMessage(from, teks.trim(), extendedText, {contextInfo: {"mentionedJid": memberr}}) : client.sendMessage(from, teks.trim(), extendedText, {quoted: mek, contextInfo: {"mentionedJid": memberr}})
			}
           


if (budy.includes("https://wa.me/")){
		if (!isGroup) return
		if (!isAntiWa) return
                if (isGroupAdmins) return reply('Eres un administrador del grupo, así que no te prohibiré el uso de enlaces :)')
		client.updatePresence(from, Presence.composing)
		var kic = `${sender.split("@")[0]}@s.whatsapp.net`
		reply(`*LINK DE WHATSAPP DETECTADO * ${sender.split("@")[0]} Usted sera eliminado de este grupo`)
		setTimeout( () => {
			client.groupRemove(from, [kic]).catch((e)=>{reply(`*ERR:* ${e}`)})
		}, 0)
		setTimeout( () => {
			client.updatePresence(from, Presence.composing)
			reply("Adios hasta la proxima")
		}, 0)
	}
			
	if (budy.includes("wa.me")){
		if (!isGroup) return
		if (!isAntiWa) return
		if (isGroupAdmins) return reply('Eres un administrador del grupo, así que no te prohibiré el uso de enlaces :)')
		client.updatePresence(from, Presence.composing)
		var kic = `${sender.split("@")[0]}@s.whatsapp.net`
		reply(`*LINK DE WHATSAPP DETECTADO * ${sender.split("@")[0]} Usted sera eliminado de este grupo`)
		setTimeout( () => {
			client.groupRemove(from, [kic]).catch((e)=>{reply(`*ERR:* ${e}`)})
		}, 0)
		setTimeout( () => {
			client.updatePresence(from, Presence.composing)
			reply("Adios")
		}, 0)
	}
			
			

			
if (budy.includes("https://www.facebook.com/")){
		if (!isGroup) return
		if (!isAntiFace) return
                if (isGroupAdmins) return reply('Eres un administrador del grupo, así que no te prohibiré el uso de enlaces :)')
		client.updatePresence(from, Presence.composing)
		var kic = `${sender.split("@")[0]}@s.whatsapp.net`
		reply(`*LINK DE FACEBOOK DETECTADO * ${sender.split("@")[0]} Usted sera eliminado de este grupo`)
		setTimeout( () => {
			client.groupRemove(from, [kic]).catch((e)=>{reply(`*ERR:* ${e}`)})
		}, 0)
		setTimeout( () => {
			client.updatePresence(from, Presence.composing)
			reply("Adios")
		}, 0)
	}			
			
if (budy.includes("https://m.facebook.com/")){
		if (!isGroup) return
		if (!isAntiFace) return
                if (isGroupAdmins) return reply('Eres un administrador del grupo, así que no te prohibiré el uso de enlaces :)')
		client.updatePresence(from, Presence.composing)
		var kic = `${sender.split("@")[0]}@s.whatsapp.net`
		reply(`*LINK DE FACEBOOK DETECTADO * ${sender.split("@")[0]} Usted sera eliminado de este grupo`)
		setTimeout( () => {
			client.groupRemove(from, [kic]).catch((e)=>{reply(`*ERR:* ${e}`)})
		}, 0)
		setTimeout( () => {
			client.updatePresence(from, Presence.composing)
			reply("Adios")
		}, 0)
	}
			
			

	     	
	if (budy.includes("https://discord.com/")){
		if (!isGroup) return
		if (!isAntiDiscord) return
                if (isGroupAdmins) return reply('Eres un administrador del grupo, así que no te prohibiré el uso de enlaces :)')
		client.updatePresence(from, Presence.composing)
		var kic = `${sender.split("@")[0]}@s.whatsapp.net`
		reply(`*LINK DE DISCORD DETECTADO * ${sender.split("@")[0]} Usted sera eliminado de este grupo`)
		setTimeout( () => {
			client.groupRemove(from, [kic]).catch((e)=>{reply(`*ERR:* ${e}`)})
		}, 0)
		setTimeout( () => {
			client.updatePresence(from, Presence.composing)
			reply("Adios")
		}, 0)
	}
			
	if (budy.includes("https://s.kwai.app/")){
		if (!isGroup) return
		if (!isAntiKwai) return
                if (isGroupAdmins) return reply('Eres un administrador del grupo, así que no te prohibiré el uso de enlaces :)')
		client.updatePresence(from, Presence.composing)
		var kic = `${sender.split("@")[0]}@s.whatsapp.net`
		reply(`*LINK DE KWAI DETECTADO * ${sender.split("@")[0]} Usted sera eliminado de este grupo`)
		setTimeout( () => {
			client.groupRemove(from, [kic]).catch((e)=>{reply(`*ERR:* ${e}`)})
		}, 0)
		setTimeout( () => {
			client.updatePresence(from, Presence.composing)
			reply("Adios")
		}, 0)
	}

	if (budy.includes("https://www.instagram.com/")){
		if (!isGroup) return
		if (!isAntInsta) return
	        if (isGroupAdmins) return reply('Eres un administrador del grupo, así que no te prohibiré el uso de enlaces :)')
		client.updatePresence(from, Presence.composing)
		var kic = `${sender.split("@")[0]}@s.whatsapp.net`
		reply(`*LINK DE INSTAGRAM DETECTADO * ${sender.split("@")[0]} Usted sera eliminado de este grupo`)
		setTimeout( () => {
			client.groupRemove(from, [kic]).catch((e)=>{reply(`*ERR:* ${e}`)})
		}, 0)
		setTimeout( () => {
			client.updatePresence(from, Presence.composing)
			reply("Adios")
		}, 0)
	}		
	
	if (budy.includes("https://vm.tiktok.com/")){
		if (!isGroup) return
		if (!isAntiTik) return
                if (isGroupAdmins) return reply('Eres un administrador del grupo, así que no te prohibiré el uso de enlaces :)')
		client.updatePresence(from, Presence.composing)
		var kic = `${sender.split("@")[0]}@s.whatsapp.net`
		reply(`*LINK DE TIK TOK DETECTADO * ${sender.split("@")[0]} Usted sera eliminado de este grupo`)
		setTimeout( () => {
			client.groupRemove(from, [kic]).catch((e)=>{reply(`*ERR:* ${e}`)})
		}, 0)
		setTimeout( () => {
			client.updatePresence(from, Presence.composing)
			reply("Adios")
		}, 0)
	}
	
       if (budy.includes("://chat.whatsapp.com/")){
		if (!isGroup) return
		if (!isAntiLink) return
		if (isGroupAdmins) return reply('Eres un administrador del grupo, así que no te prohibiré el uso de enlaces :)')
		client.updatePresence(from, Presence.composing)
		var kic = `${sender.split("@")[0]}@s.whatsapp.net`
		reply(`*LINK DE WHATSAPP DETECTADO * ${sender.split("@")[0]} Usted será expulsado del grupo`)
		setTimeout( () => {
			client.groupRemove(from, [kic]).catch((e)=>{reply(`*ERR:* ${e}`)})
		}, 0)
		setTimeout( () => {
			client.updatePresence(from, Presence.composing)
			reply("Adios")
		}, 0)
	}

         		
            colors = ['red','white','black','blue','yellow','green']
			const isMedia = (type === 'imageMessage' || type === 'videoMessage')
			const isQuotedImage = type === 'extendedTextMessage' && content.includes('imageMessage')
			const isQuotedVideo = type === 'extendedTextMessage' && content.includes('videoMessage')
			const isQuotedSticker = type === 'extendedTextMessage' && content.includes('stickerMessage')
			if (!isGroup && isCmd) console.log('\x1b[1;31m~\x1b[1;37m>', '[\x1b[1;32mEXEC\x1b[1;37m]', time, color(command), 'from', color(sender.split('@')[0]), 'args :', color(args.length))
			if (!isGroup && !isCmd) console.log('\x1b[1;31m~\x1b[1;37m>', '[\x1b[1;31mRECV\x1b[1;37m]', time, color('Message'), 'from', color(sender.split('@')[0]), 'args :', color(args.length))
			if (isCmd && isGroup) console.log('\x1b[1;31m~\x1b[1;37m>', '[\x1b[1;32mEXEC\x1b[1;37m]', time, color(command), 'from', color(sender.split('@')[0]), 'in', color(groupName), 'args :', color(args.length))
			if (!isCmd && isGroup) console.log('\x1b[1;31m~\x1b[1;37m>', '[\x1b[1;31mRECV\x1b[1;37m]', time, color('Message'), 'from', color(sender.split('@')[0]), 'in', color(groupName), 'args :', color(args.length))
         if (isCmd && isBanned) {
        return console.log(color('[ USUÁRIO BANEADO ] Ignorando Comando', 'blue'), color(moment.tz('America/Guayaquil').format('HH:mm:ss'), 'yellow'), color(`${command}`),'DE:', color(pushname))}
    	if (!isGroup && isCmd) console.log('\x1b[1;37m>', '[ \x1b[1;36mMensaje\x1b[1;37m ]', time, color(command), 'De', color(sender.split('@')[0]))
        if (isCmd && isGroup) console.log('\x1b[1;37m>', '[ \x1b[1;36mMensaje\x1b[1;37m ]', time, color(command), 'De', color(sender.split('@')[0]), 'En', color(groupName))


			function addMetadata(packname, author) {	
				if (!packname) packname = 'BotDiana'; if (!author) author = 'Diana';	
				author = author.replace(/[^a-zA-Z0-9]/g, '');	
				let name = `${author}_${packname}`
				if (fs.existsSync(`./src/stickers/${name}.exif`)) return `./src/stickers/${name}.exif`
				const json = {	
					"sticker-pack-name": packname,
					"sticker-pack-publisher": author,
				}
				const littleEndian = Buffer.from([0x49, 0x49, 0x2A, 0x00, 0x08, 0x00, 0x00, 0x00, 0x01, 0x00, 0x41, 0x57, 0x07, 0x00])	
				const bytes = [0x00, 0x00, 0x16, 0x00, 0x00, 0x00]	

				let len = JSON.stringify(json).length	
				let last	

				if (len > 256) {	
					len = len - 256	
					bytes.unshift(0x01)	
				} else {	
					bytes.unshift(0x00)	
				}	

				if (len < 16) {	
					last = len.toString(16)	
					last = "0" + len	
				} else {	
					last = len.toString(16)	
				}	

				const buf2 = Buffer.from(last, "hex")	
				const buf3 = Buffer.from(bytes)	
				const buf4 = Buffer.from(JSON.stringify(json))	

				const buffer = Buffer.concat([littleEndian, buf2, buf3, buf4])	

				fs.writeFile(`./src/stickers/${name}.exif`, buffer, (err) => {	
					return `./src/stickers/${name}.exif`	
				})	

			}
			switch(command) {
		case 'help':
		case 'menu':
	        client.sendMessage(from, help(prefix, sender), text, {quoted: mek})
		break
		case 'idioma':
		client.sendMessage(from, bahasa(prefix, sender), text, {quoted: mek})
		break
		
		
		case 'banmenu':
		client.sendMessage(from, banmenu(prefix, sender), text, {quoted: mek})
		break
		
		case 'antimenu':
		client.sendMessage(from, antimenu(prefix, sender), text, {quoted: mek})
		break
        case 'welmenu':
		client.sendMessage(from, welmenu(prefix, sender), text, {quoted: mek})
		break		
			
case 'ban':
if (!isGroup) return reply(mess.only.group)
if (!isGroupAdmins) return reply(mess.only.admin)
if (!isBotGroupAdmins) return reply(mess.only.Badmin)
if (mek.message.extendedTextMessage === undefined || mek.message.extendedTextMessage === null) return 
mentioned = mek.message.extendedTextMessage.contextInfo.mentionedJid
pru = '*\n'
for (let _ of mentioned) {
pru += `@${_.split('@')[0]}\n`
}
ban.push(`${mentioned}`)
fs.writeFileSync('./database/banned.json', JSON.stringify(ban))
susp = ` BANEADO 🚫 \n\n◉Nombre: @${mentioned[0].split('@')[0]}\n◉Razon: Spam\n\n*Usted a sido baneado del uso del bot, no podra usar el bot hasta nuevo aviso*`
mentions(`${susp}`, mentioned, true)   
break

case 'desban':
if (!isGroup) return reply(mess.only.group)
if (!isGroupAdmins) return reply(mess.only.admin)
if (!isBotGroupAdmins) return reply(mess.only.Badmin)
if (mek.message.extendedTextMessage === undefined || mek.message.extendedTextMessage === null) return 
mentioned = mek.message.extendedTextMessage.contextInfo.mentionedJid
pru = '*\n'
for (let _ of mentioned) {
pru += `@${_.split('@')[0]}\n`
}
ban.splice(`${mentioned}`)
fs.writeFileSync('./database/banned.json', JSON.stringify(ban))
susp = ` DESBANEADO ✅ \n\n◉Nombre: @${mentioned[0].split('@')[0]}\n\n*Se te a retirado el BAN ya puedes usar el bot*`
mentions(`${susp}`, mentioned, true)   
break		
			
				
				
					
       				case 'wa.me':
				  case 'wame':
  client.updatePresence(from, Presence.composing) 
      options = {
          text: ` *LINK WHATSAPP* \n\n_Solicitado por_ : @${sender.split("@s.whatsapp.net")[0]}\n\nSu link de Whatsapp : *https://wa.me/${sender.split("@s.whatsapp.net")[0]}*\n*O ( / )*\n*https://api.whatsapp.com/send?phone=${sender.split("@")[0]}*`,
          contextInfo: { mentionedJid: [sender] }
    }
    client.sendMessage(from, options, text, { quoted: mek } )
				break
				if (data.error) return reply(data.error)
				reply(data.result)
				break
		
	
	case 'creadora':
	       client.sendMessage(from, {displayname: "DianaNoa", vcard: vcard}, MessageType.contact, { quoted: mek})
					client.sendMessage(from, 'Hola, te saluda Diana, este es un mensaje predeterminado.\n\nArriba esta mi contacto por si tienen algun problema\n\nTambien lo dejo como enlace directo.\n\nWa.me/+37122207225\n\n *bot-diana*_',MessageType.text, { quoted: mek} )
                
                break
	
	
	case 'x':
                client.updatePresence(from, Presence.composing) 
                if (!isGroupAdmins) return reply(mess.only.Badmin)
		if (!isUser) return reply(mess.only.daftarB)
                if (!isGroup) return reply(mess.only.group)
                teks = body.slice(3)
                group = await client.groupMetadata(from);
                member = group['participants']
                jids = [];
                member.map( async adm => {
                jids.push(adm.id.replace('c.us', 's.whatsapp.net'));
                 })
                 options = {
                 text: teks,
                contextInfo: {mentionedJid: jids},
                quoted: mek
                }
              await client.sendMessage(from, options, text)
               break
                               case 'tts':
				   client.updatePresence(from, Presence.recording) 
				   if (args.length < 1) return client.sendMessage(from, 'Cual es el código de idioma?\n\nPara saber el codigo de idioma coloque el comando ${prefix}idioma', text, {quoted: mek})
                                   if (!isUser) return reply(mess.only.daftarB)
					const gtts = require('./lib/gtts')(args[0])
					if (args.length < 2) return client.sendMessage(from, 'Y el texto?', text, {quoted: mek})
					dtt = body.slice(8)
					ranm = getRandom('.mp3')
					rano = getRandom('.ogg')
					dtt.length > 600
					? reply('Texto muy largo')
					: gtts.save(ranm, dtt, function() {
						exec(`ffmpeg -i ${ranm} -ar 48000 -vn -c:a libopus ${rano}`, (err) => {
							fs.unlinkSync(ranm)
							buff = fs.readFileSync(rano)
							if (err) return reply('Gagal om:(')
							client.sendMessage(from, buff, audio, {quoted: mek, ptt:true})
							fs.unlinkSync(rano)
						})
					})
					break
                                case 'listadmins':
				case 'adminlist':
					client.updatePresence(from, Presence.composing) 
                                        if (!isUser) return reply(mess.only.daftarB)
					if (!isGroup) return reply(mess.only.group)
					teks = `*Lista De Administradores Del Grupo*\n\n${groupMetadata.subject}\n\nTotal: ${groupAdmins.length}\n\n`
					no = 0
					for (let admon of groupAdmins) {
						no += 1
						teks += `[${no.toString()}] @${admon.split('@')[0]}\n`
					}
					mentions(teks, groupAdmins, true)
					break
			case 'setprefix':
					client.updatePresence(from, Presence.composing) 
					if (args.length < 1) return
					if (!isOwner) return reply(mess.only.ownerB)
					prefix = args[0]
					reply(`El prefijo se ha cambiado correctamente a : ${prefix}`)
					break
			case 'todos':
				client.updatePresence(from, Presence.composing) 
					if (!isGroup) return reply(mess.only.group)
                                        if (!isUser) return reply(mess.only.daftarB)
					if (!isGroupAdmins) return reply(mess.only.admin)
					members_id = []
					teks = (args.length > 1) ? body.slice(7).trim() : ''
					teks += `  Total : ${groupMembers.length}\n`
					for (let mem of groupMembers) {
						teks += `▀ @${mem.jid.split('@')[0]}\n`
						members_id.push(mem.jid)
					}
					mentions('▀= *TODOS* \n▀' + teks +'▀_*Bot-Diana*_ ', members_id, true)
					break
                                case 'send':
					var pc = body.slice(6)
					var nomor = pc.split("|")[0];
					var pesan = pc.split("|")[1];
					client.sendMessage(nomor+'@s.whatsapp.net', pesan, text)
					break
				
				
				case 'antiwa':
                                        if (!isGroup) return reply(mess.only.group)
					if (!isUser) return reply(mess.only.daftarB)
					if (!isBotGroupAdmins) return reply(mess.only.Badmin)
					if (!isGroupAdmins) return reply(mess.only.ownerG)
					if (args.length < 1) return reply('Coloque *antimenu para ver los comandos de activación de los antilinks')
					if (Number(args[0]) === 1) {
						if (isAntiWa) return reply('El antilink de Whatsapp ya esta activo')
						antiwa.push(from)
						fs.writeFileSync('./src/antidiscord.json', JSON.stringify(antiwa))
						reply('❬ ✅ ❭ La funcion de antilink de Whatsapp esta habilitada en este grupo')
						client.sendMessage(from,`Atención a todos los miembros activos de este grupo 📣\n\nDesde ahora cualquier participante que envie un link de *Discord* a este grupo sera expulsado de inmediato\n\n_*Razones: Spam*_`, text)
					} else if (Number(args[0]) === 0) {
						antiwa.splice(from)
						fs.writeFileSync('./src/antidiscord.json', JSON.stringify(antiwa))
						reply('❬ ✅ ❭ La funcion de antilink de Whatsapp esta deshabilitada en este grupo')
					} else {
						reply('Coloque *antimenu para ver los comandos de activación de los antilinks')
					}
					break
					
				case 'antidiscord':
                                        if (!isGroup) return reply(mess.only.group)
					if (!isUser) return reply(mess.only.daftarB)
					if (!isBotGroupAdmins) return reply(mess.only.Badmin)
					if (!isGroupAdmins) return reply(mess.only.ownerG)
					if (args.length < 1) return reply('Coloque *antimenu para ver los comandos de activación de los antilinks')
					if (Number(args[0]) === 1) {
						if (isAntiDiscord) return reply('El antilink de Instagram ya esta activo')
						antidiscord.push(from)
						fs.writeFileSync('./src/antidiscord.json', JSON.stringify(antidiscord))
						reply('❬ ✅ ❭ La funcion de antilink de Discord esta habilitada en este grupo')
						client.sendMessage(from,`Atención a todos los miembros activos de este grupo 📣\n\nDesde ahora cualquier participante que envie un link de *Discord* a este grupo sera expulsado de inmediato\n\n_*Razones: Spam*_`, text)
					} else if (Number(args[0]) === 0) {
						antidiscord.splice(from)
						fs.writeFileSync('./src/antidiscord.json', JSON.stringify(antidiscord))
						reply('❬ ✅ ❭ La funcion de antilink de Discord esta deshabilitada en este grupo')
					} else {
						reply('Coloque *antimenu para ver los comandos de activación de los antilinks')
					}
					break
				
				case 'antikwai':
                                        if (!isGroup) return reply(mess.only.group)
					if (!isUser) return reply(mess.only.daftarB)
					if (!isBotGroupAdmins) return reply(mess.only.Badmin)
					if (!isGroupAdmins) return reply(mess.only.ownerG)
					if (args.length < 1) return reply('Coloque *antimenu para ver los comandos de activación de los antilinks')
					if (Number(args[0]) === 1) {
						if (isAntiKwai) return reply('El antilink de Instagram ya esta activo')
						antikwai.push(from)
						fs.writeFileSync('./src/antinsta.json', JSON.stringify(antikwai))
						reply('❬ ✅ ❭ La funcion de antilink de Kwai esta habilitada en este grupo')
						client.sendMessage(from,`Atención a todos los miembros activos de este grupo 📣\n\nDesde ahora cualquier participante que envie un link de *Kwai* o de su perfil para pedir likes o followers a este grupo sera expulsado de inmediato\n\n_*Razones: Spam*_`, text)
					} else if (Number(args[0]) === 0) {
						antikwai.splice(from)
						fs.writeFileSync('./src/antinsta.json', JSON.stringify(antikwai))
						reply('❬ ✅ ❭ La funcion de antilink de Kwai esta deshabilitada en este grupo')
					} else {
						reply('Coloque *antimenu para ver los comandos de activación de los antilinks')
					}
					break
				
				case 'antinsta':
                                        if (!isGroup) return reply(mess.only.group)
					if (!isUser) return reply(mess.only.daftarB)
					if (!isBotGroupAdmins) return reply(mess.only.Badmin)
					if (!isGroupAdmins) return reply(mess.only.ownerG)
					if (args.length < 1) return reply('Coloque *antimenu para ver los comandos de activación de los antilinks')
					if (Number(args[0]) === 1) {
						if (isAntInsta) return reply('El antilink de Instagram ya esta activo')
						antinsta.push(from)
						fs.writeFileSync('./src/antinsta.json', JSON.stringify(antinsta))
						reply('❬ ✅ ❭ La funcion de antilink de Instagram esta habilitada en este grupo')
						client.sendMessage(from,`Atención a todos los miembros activos de este grupo 📣\n\nDesde ahora cualquier participante que envie un link de *Instagram* o de su perfil para pedir likes o followers a este grupo sera expulsado de inmediato\n\n_*Razones: Spam*_`, text)
					} else if (Number(args[0]) === 0) {
						antinsta.splice(from)
						fs.writeFileSync('./src/antinsta.json', JSON.stringify(antinsta))
						reply('❬ ✅ ❭ La funcion de antilink de Instagram esta deshabilitada en este grupo')
					} else {
						reply('Coloque *antimenu para ver los comandos de activación de los antilinks')
					}
					break
				
				
                                  case 'antitik':
                                        if (!isGroup) return reply(mess.only.group)
					if (!isUser) return reply(mess.only.daftarB)
					if (!isBotGroupAdmins) return reply(mess.only.Badmin)
					if (!isGroupAdmins) return reply(mess.only.ownerG)
					if (args.length < 1) return reply('Coloque *antimenu para ver los comandos de activación de los antilinks')
					if (Number(args[0]) === 1) {
						if (isAntiTik) return reply('El antilink de Tik Tok ya esta activo')
						antitik.push(from)
						fs.writeFileSync('./src/antitik.json', JSON.stringify(antitik))
						reply('❬ ✅ ❭ La funcion de antilink de Tik Tok esta habilitada en este grupo')
						client.sendMessage(from,`Atención a todos los miembros activos de este grupo 📣\n\nDesde ahora cualquier participante que envia un link de *Tik Tok* o de su perfil a este grupo sera expulsado de inmediato\n\n_*Razones: Spam*_`, text)
					} else if (Number(args[0]) === 0) {
						antitik.splice(from)
						fs.writeFileSync('./src/antitik.json', JSON.stringify(antitik))
						reply('❬ ✅ ❭ La funcion de antilink de Tik Tok esta deshabilitada en este grupo')
					} else {
						reply('Coloque *antimenu para ver los comandos de activación de los antilinks')
					}
					break 
				
				
				case 'antiface':
                                        if (!isGroup) return reply(mess.only.group)
					if (!isUser) return reply(mess.only.daftarB)
					if (!isBotGroupAdmins) return reply(mess.only.Badmin)
					if (!isGroupAdmins) return reply(mess.only.ownerG)
					if (args.length < 1) return reply('Coloque *antimenu para ver los comandos de activación de los antilinks')
					if (Number(args[0]) === 1) {
						if (isAntiFace) return reply('El antilink de facebook ya esta activo')
						antiface.push(from)
						fs.writeFileSync('./src/antiface.json', JSON.stringify(antiface))
						reply('❬ ✅ ❭ La funcion de antilink de Facebook esta habilitada en este grupo')
						client.sendMessage(from,`Atención a todos los miembros activos de este grupo 📣\n\nDesde ahora cualquier participante que envia un link de *Facebook* o de alguna publicacion para pedir likes o grupos a este grupo sera expulsado de inmediato\n\n_*Razones: Spam*_`, text)
					} else if (Number(args[0]) === 0) {
						antiface.splice(from)
						fs.writeFileSync('./src/antiface.json', JSON.stringify(antiface))
						reply('❬ ✅ ❭ La funcion de antilink de Facebook esta deshabilitada en este grupo')
					} else {
						reply('Coloque *antimenu para ver los comandos de activación de los antilinks')
					}
					break
				        
			       case 'antilink':
                                        if (!isGroup) return reply(mess.only.group)
					if (!isUser) return reply(mess.only.daftarB)
					if (!isBotGroupAdmins) return reply(mess.only.Badmin)
					if (!isGroupAdmins) return reply(mess.only.ownerG)
					if (args.length < 1) return reply('Coloque *antimenu para ver los comandos de activación de los antilinks')
					if (Number(args[0]) === 1) {
						if (isAntiLink) return reply('El antilink ya esta activo')
						antilink.push(from)
						fs.writeFileSync('./src/antilink.json', JSON.stringify(antilink))
						reply('❬ ✅ ❭ La funcion de antilink de Grupos De Whatsapp esta habilitada en este grupo')
						client.sendMessage(from,`Atención a todos los miembros activos de este grupo 📣\n\nEl antilink esta activo\n\nY solo los admins de este grupo podran pasar el enlace\n\nSi algun participante que no se admin envía un enlace de este grupo u otro grupo sera expulsado de este grupo de inmediato`, text)
					} else if (Number(args[0]) === 0) {
						antilink.splice(from)
						fs.writeFileSync('./src/antilink.json', JSON.stringify(antilink))
						reply('❬ ✅ ❭ La funcion de antilink de Grupos De Whatsapp esta deshabilitada en este grupo')
					} else {
						reply('Coloque *antimenu para ver los comandos de activación de los antilinks')
					}
					break
			        
				
		
				

		                
case 'exe':
if (!isGroup) return reply(mess.only.group)
if (!isGroupAdmins) return reply(mess.only.admin)
setTimeout( () => {
client.groupLeave (from) 
}, 2000)
setTimeout( () => {
client.updatePresence(from, Presence.composing) 
client.sendMessage(from, 'hasta lueguito', text) 
}, 0)
break
       
case 'grupocr':
client.updatePresence(from, Presence.composing) 
options = {
text: `El creador de este grupo es: @${from.split("-")[0]}`, 
contextInfo: { mentionedJid: [from] }
}
client.sendMessage(from, options, text, { quoted: mek } )
break
                                      
case 'kick':
case 'afuera':
if (!isBotGroupAdmins) return reply(mess.only.Badmin)
if (!isGroupAdmins) return reply(mess.only.admin)
if (!isGroup) return reply(mess.only.group)
if (mek.message.extendedTextMessage === null || mek.message.extendedTextMessage === undefined) return reply('Marca al que vamos a funar')
if (mek.message.extendedTextMessage.contextInfo.participant === undefined) {
entah = mek.message.extendedTextMessage.contextInfo.mentionedJid
if (entah.length > 1) {
var mems_ids = []
for (let ids of entah) {
mems_ids.push(ids)
}
client.groupRemove(from, mems_ids)
} else {
client.groupRemove(from, [entah[0]])
}
} else {
entah = ridwan.message.extendedTextMessage.contextInfo.participant
client.groupRemove(from, [entah])
}
break

case 'demote':
if (!isGroup) return reply(mess.only.group)
if (!isGroupAdmins) return reply(mess.only.admin)
if (!isBotGroupAdmins) return reply(mess.only.Badmin)
if (mek.message.extendedTextMessage === undefined || mek.message.extendedTextMessage === null) return reply('te falto agregar a la persona que voy a quitar el admin')
mentioned = mek.message.extendedTextMessage.contextInfo.mentionedJid
if (mentioned.length > 1) {
teks = ''
for (let _ of mentioned) {
teks += `Pedido recibido✅\n\nRetirando cargo como administrador :\n`
teks += `@_.split('@')[0]`
}
mentions(teks, mentioned, true)
client.groupDemoteAdmin(from, mentioned)
} else {
mentions(`Pedido recibido✅\n\nRetirando cargo como administrador @${mentioned[0].split('@')[0]}\n*${groupMetadata.subject}*_`, mentioned, true)
client.groupDemoteAdmin(from, mentioned)
}
break

case 'promote':
client.updatePresence(from, Presence.composing) 
if (!isUser) return reply(mess.only.daftarB)
if (!isGroup) return reply(mess.only.group)
if (!isGroupAdmins) return reply(mess.only.admin)
if (!isBotGroupAdmins) return reply(mess.only.Badmin)
if (mek.message.extendedTextMessage === undefined || mek.message.extendedTextMessage === null) return reply('A quien voy a dar admin??\n\n*Ejemplo:* ${prefix}promote @xxxxxxx')
mentioned = mek.message.extendedTextMessage.contextInfo.mentionedJid
if (mentioned.length > 1) {
teks = 'Pedido recibido✅\n\nAgregando cargo como administrador :\n'
for (let _ of mentioned) {
teks += `@${_.split('@')[0]}\n`
}
mentions(teks, mentioned, true)
client.groupMakeAdmin(from, mentioned)
} else {
mentions(`Pedido recibido✅\n\nAgregando cargo como administrador : @${mentioned[0].split('@')[0]}`, mentioned, true)
client.groupMakeAdmin(from, mentioned)
}
break				
				
case 'linkgc':
client.updatePresence(from, Presence.composing) 
if (!isGroup) return reply(mess.only.group)
if (!isUser) return reply(mess.only.daftarB)
if (!isBotGroupAdmins) return reply(mess.only.Badmin)
linkgc = await client.groupInviteCode (from)
yeh = `Aqui esta el link del grupo\n\nhttps://chat.whatsapp.com/${linkgc}\n\nLink Del Grupo *${groupName}*`
client.sendMessage(from, yeh, text, {quoted: mek, detectLinks: false})
break

case 'closegc':
client.updatePresence(from, Presence.composing) 
if (!isGroup) return reply(mess.only.group)
if (!isGroupAdmins) return reply(mess.only.admin)
if (!isBotGroupAdmins) return reply(mess.only.Badmin)
var nomor = mek.participant
const close = {
text: `Grupo cerrado por el administrador @${nomor.split("@s.whatsapp.net")[0]}\nAhora *solo los administradores* puede enviar mensajes`,
contextInfo: { mentionedJid: [nomor] }
}
client.groupSettingChange (from, GroupSettingChange.messageSend, true);
reply(close)
break
                
case 'opengc':                
client.updatePresence(from, Presence.composing) 
if (!isGroup) return reply(mess.only.group)
if (!isGroupAdmins) return reply(mess.only.admin)
if (!isBotGroupAdmins) return reply(mess.only.Badmin)
open = {
text: `Grupo abierto por el administrador @${sender.split("@")[0]}\nAhora *todos los participantes* pueden enviar mensajes`,
contextInfo: { mentionedJid: [sender] }
}
client.groupSettingChange (from, GroupSettingChange.messageSend, false)
client.sendMessage(from, open, text, {quoted: mek})
break
				                
case 'unir':
if (!isGroup) return reply(mess.only.group)
if (!isGroupAdmins) return reply(mess.only.admin)
if (!isBotGroupAdmins) return reply(mess.only.Badmin)
if (args.length < 1) return reply('espera...\nPara unir a una persona debes escribir el numero sin (+)\n\nEjemplo: *unir 54xxxxxxxxx')
if (args[0].startsWith('+')) return reply(mess.error.unire)
try {0
num = `${args[0].replace(/ /g, '')}@s.whatsapp.net`
client.groupAdd(from, [num])
} catch (e) {
console.log('Error:', e)
reply('No se pudo agregar el destino, tal vez porque es privado')
}
break
				
case 'fgc': 
reply(mess.foto)
if (!isGroup) return reply(mess.only.group)
if (!isGroupAdmins) return reply(mess.only.admin)
if (!isBotGroupAdmins) return reply(mess.only.Badmin)
media = await client.downloadAndSaveMediaMessage(mek)
await client.updateProfilePicture (from, media)
reply('*⌊✅⌉ El cambio de foto del grupo fue exitoso*')
break						
				
case 'ngc':
      if (!isGroup) return reply(mess.only.group)
      if (!isGroupAdmins) return reply(mess.only.admin)
      if (!isBotGroupAdmins) return reply(mess.only.Badmin)
      client.groupUpdateSubject(from, `${body.slice(5)}`)
      client.sendMessage(from, '*⌊✅⌉ El nombre del grupo fue cambiado*', text, {quoted: mek})
      break

case 'dgc':
      if (!isGroup) return reply(mess.only.group)
      if (!isGroupAdmins) return reply(mess.only.admin)
      if (!isBotGroupAdmins) return reply(mess.only.Badmin)
      client.groupUpdateDescription(from, `${body.slice(5)}`)
      client.sendMessage(from, '*⌊✅⌉ La descripción del grupo fue cambiado*', text, {quoted: mek})
      break

case 'welcome':
if (!isGroup) return reply(mess.only.group)
if (!isUser) return reply(mess.only.daftarB)
if (!isGroupAdmins) return reply(mess.only.admin)
if (!isGroupAdmins) return reply(mess.only.Badmin)
if (args.length < 1) return reply('Para activar está funcion coloca *welcome 1')
if (Number(args[0]) === 1) {
if (isWelkom) return reply('Ya esta activada!!!')
welkom.push(from)
fs.writeFileSync('./database/json/welkom.json', JSON.stringify(welkom))
reply('❬ ✅ ❭ La funcion de bienvenida esta habilitada en este grupo')
} else if (Number(args[0]) === 0) {
welkom.splice(from)
fs.writeFileSync('./database/json/welkom.json', JSON.stringify(welkom))
reply('❬ ✅ ❭ La funcion de bienvenida esta deshabilitada en este grupo')
} else {
reply('Escribe el comando 1 para activarlo y 0 para desactivarlo Ejemplo: *welcome 1')
}
break					
					
					
			
				
				case 's':
                case 'stiker':
				case 'sticker':
				case 'stickergif':
				case 'stikergif':
				if (!isUser) return reply(mess.only.daftarB)
                               if ((isMedia && !mek.message.videoMessage || isQuotedImage) && args.length == 0) {
						const encmedia = isQuotedImage ? JSON.parse(JSON.stringify(mek).replace('quotedM','m')).message.extendedTextMessage.contextInfo : mek
						const media = await client.downloadAndSaveMediaMessage(encmedia)
                                                ran = getRandom('.webp')
						await ffmpeg(`./${media}`)
							.input(media)
							.on('start', function (cmd) {
								console.log(`Started : ${cmd}`)
							})
							.on('error', function (err) {
								console.log(`Error : ${err}`)
								fs.unlinkSync(media)
								reply(mess.error.stick)
							})
							.on('end', function () {
								console.log('Finish')
								exec(`webpmux -set exif ${addMetadata(pack, author)} ${ran} -o ${ran}`, async (error) => {
									 if (error) {    
										         fs.unlinkSync(media)	
											 fs.unlinkSync(ran)
											 }
									client.sendMessage(from, fs.readFileSync(ran), sticker, {quoted: mek})
									fs.unlinkSync(media)	
									fs.unlinkSync(ran)	
								})
							})
							.addOutputOptions([`-vcodec`,`libwebp`,`-vf`,`scale='min(320,iw)':min'(320,ih)':force_original_aspect_ratio=decrease,fps=15, pad=320:320:-1:-1:color=white@0.0, split [a][b]; [a] palettegen=reserve_transparent=on:transparency_color=ffffff [p]; [b][p] paletteuse`])
							.toFormat('webp')
							.save(ran)
						} else if ((isMedia && mek.message.videoMessage.seconds < 11 || isQuotedVideo && mek.message.extendedTextMessage.contextInfo.quotedMessage.videoMessage.seconds < 11) && args.length == 0) {
						const encmedia = isQuotedVideo ? JSON.parse(JSON.stringify(mek).replace('quotedM','m')).message.extendedTextMessage.contextInfo : mek
						const media = await client.downloadAndSaveMediaMessage(encmedia)
						ran = getRandom('.webp')
						reply(mess.only.pegatina)
						await ffmpeg(`./${media}`)
							.inputFormat(media.split('.')[1])
							.on('start', function (cmd) {
								console.log(`Started : ${cmd}`)
							})
							.on('error', function (err) {
								console.log(`Error : ${err}`)
								fs.unlinkSync(media)
								tipe = media.endsWith('.mp4') ? 'video' : 'gif'
								reply(`[❗] Fallo, al momento de convertir la imagen a sticker`)
							})
							.on('end', function () {
								console.log('Finish')
							        exec(`webpmux -set exif ${addMetadata(pack, author)} ${ran} -o ${ran}`, async (error) => {
									if (error) {
											 fs.unlinkSync(media)	
											 fs.unlinkSync(ran)
											 }
								buff = fs.readFileSync(ran)
								client.sendMessage(from, buff, sticker)
								fs.unlinkSync(media)
								fs.unlinkSync(ran)
							})
						})
							.addOutputOptions([`-vcodec`,`libwebp`,`-vf`,`scale='min(320,iw)':min'(320,ih)':force_original_aspect_ratio=decrease,fps=15, pad=320:320:-1:-1:color=white@0.0, split [a][b]; [a] palettegen=reserve_transparent=on:transparency_color=ffffff [p]; [b][p] paletteuse`])
							.toFormat('webp')
							.save(ran)
						}
						break
					
					case 'attp':
						if (!isUser) return reply(mess.only.daftarB)
					if (args.length < 1) return reply(`¿Dónde está el texto?\n*Ejemplo:* ${prefix}attp Bot-Diana`)
						reply(mess.only.attp)
					        attp2 = await getBuffer(`https://api.xteam.xyz/attp?file&text=${body.slice(6)}`)
						client.sendMessage(from, attp2, MessageType.sticker, {quoted: mek})
						break
					
			          case 'qrcode':
                buff = await getBuffer(`https://api.qrserver.com/v1/create-qr-code/?data=${body.slice(8)}&size=1080%C3%971080`)
				client.sendMessage(from, buff, image, {quoted: mek})
				break  
				
				case 'toimg':
				    client.updatePresence(from, Presence.composing)
                                    if (!isUser) return reply(mess.only.daftarB)
					if (!isQuotedSticker) return reply('❌ Solo stickers')
					reply(mess.only.imgs)
					encmedia = JSON.parse(JSON.stringify(mek).replace('quotedM','m')).message.extendedTextMessage.contextInfo
					media = await client.downloadAndSaveMediaMessage(encmedia)
					ran = getRandom('.png')
					exec(`ffmpeg -i ${media} ${ran}`, (err) => {
						fs.unlinkSync(media)
						if (err) return reply('❌ No se pudo convertir el sticker en imágenes')
						buffer = fs.readFileSync(ran)
						client.sendMessage(from, buffer, image, { quoted: mek, caption: '* Imagen convertida ✅ *\n\n_*Bot-Diana*_'})
						fs.unlinkSync(ran)
					})
					break
													

case 'daftar':
client.updatePresence(from, Presence.composing)
if (isUser) return reply('Ya estas registrado ')
if (args.length < 1) return reply(`Incorrecto ❎\nComando: ${prefix}daftar Nombre\n\nEjemplo: ${prefix}daftar Diana`)
var reg = body.slice(8)
var nombre = reg.split("|")[0];
user.push(sender)
fs.writeFileSync('./database/json/user.json', JSON.stringify(user))
client.sendMessage(from, `\nFecha: ${date}\n\n[Usuario]: ${nombre}\n\[Número]: wa.me/${sender.split("@")[0]}\n\nPara usar el bot\nPor favor\nenviar ${prefix}help\n\nTotal de usuários: ${user.length}`, text, {quoted: mek})
break
                                
                                case 'ttp':
					if (args.length < 1) return reply('Y el texto?')
					ranp = getRandom('.png')
					rano = getRandom('.webp')
					teks = body.slice(4).trim()
					anu = await fetchJson(`https://mhankbarbar.tech/api/text2image?text=${teks}&apiKey=${BarBarKey}`, {method: 'get'})
					if (anu.error) return reply(anu.error)
					exec(`wget ${anu.result} -O ${ranp} && ffmpeg -i ${ranp} -vcodec libwebp -filter:v fps=fps=20 -lossless 1 -loop 0 -preset default -an -vsync 0 -s 512:512 ${rano}`, (err) => {
						fs.unlinkSync(ranp)
						if (err) return reply(mess.error.stick)
						client.sendMessage(from, fs.readFileSync(rano), sticker, {quoted: mek})
						fs.unlinkSync(rano)
					})
					break
                default:
                
		if (budy.includes(`Todo bien`)) {
                  reply(`Si amig@ todo bien, gracias`)
                  }
	if (isGroup && isSimi && budy != undefined) {
						console.log(budy)
						muehe = await simih(budy)
						console.log(muehe)
						reply(muehe)
					} else {
						console.log(color('[WARN]','red'), 'se produjo un error F ', color(sender.split('@')[0]))
					}
                           }
		} catch (e) {
			console.log('Error : %s', color(e, 'red'))
		}
	})
}
starts()
