import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import nodemailer from 'nodemailer'

function contactMailPlugin(env) {
  return {
    name: 'contact-mail-api',
    configureServer(server) {
      server.middlewares.use('/api/contact', async (req, res, next) => {
        if (req.method !== 'POST') return next()

        try {
          const chunks = []
          for await (const chunk of req) chunks.push(chunk)
          const data = JSON.parse(Buffer.concat(chunks).toString('utf8'))
          const firstName = String(data.firstName || '').trim()
          const lastName = String(data.lastName || '').trim()
          const email = String(data.email || '').trim()
          const phone = String(data.phone || '').trim()
          const message = String(data.message || '').trim()

          if (!firstName || !email || !message) {
            res.statusCode = 400
            res.setHeader('Content-Type', 'application/json')
            return res.end(JSON.stringify({ error: 'Please fill all required fields.' }))
          }

          if (!env.MAIL_USER || !env.MAIL_APP_PASSWORD) {
            res.statusCode = 500
            res.setHeader('Content-Type', 'application/json')
            return res.end(JSON.stringify({ error: 'Email settings are missing in .env.' }))
          }

          const transporter = nodemailer.createTransport({
            host: env.SMTP_HOST || 'smtp.gmail.com',
            port: Number(env.SMTP_PORT || 465),
            secure: String(env.SMTP_PORT || 465) === '465',
            auth: { user: env.MAIL_USER, pass: env.MAIL_APP_PASSWORD },
          })

          await transporter.sendMail({
            from: `Veda Website <${env.MAIL_USER}>`,
            to: env.CONTACT_TO_EMAIL || env.MAIL_USER,
            replyTo: email,
            subject: `New contact message from ${firstName} ${lastName}`.trim(),
            text: `Name: ${firstName} ${lastName}\nEmail: ${email}\nPhone: ${phone}\n\nMessage:\n${message}`,
          })

          res.statusCode = 200
          res.setHeader('Content-Type', 'application/json')
          return res.end(JSON.stringify({ message: 'Message sent successfully.' }))
        } catch (error) {
          console.error('Contact form email error:', error)
          res.statusCode = 500
          res.setHeader('Content-Type', 'application/json')
          return res.end(JSON.stringify({ error: 'Unable to send message right now.' }))
        }
      })

      server.middlewares.use('/api/admission', async (req, res, next) => {
        if (req.method !== 'POST') return next()

        try {
          const chunks = []
          for await (const chunk of req) chunks.push(chunk)
          const data = JSON.parse(Buffer.concat(chunks).toString('utf8'))
          const studentName = String(data.studentName || '').trim()
          const parentName = String(data.parentName || '').trim()
          const email = String(data.email || '').trim()
          const phone = String(data.phone || '').trim()
          const city = String(data.city || '').trim()
          const className = String(data.className || '').trim()
          const branch = String(data.branch || '').trim()

          if (!studentName || !parentName || !email || !phone || !city || !className || !branch) {
            res.statusCode = 400
            res.setHeader('Content-Type', 'application/json')
            return res.end(JSON.stringify({ error: 'Please fill all admission form fields.' }))
          }

          if (!env.MAIL_USER || !env.MAIL_APP_PASSWORD) {
            res.statusCode = 500
            res.setHeader('Content-Type', 'application/json')
            return res.end(JSON.stringify({ error: 'Email settings are missing in .env.' }))
          }

          const transporter = nodemailer.createTransport({
            host: env.SMTP_HOST || 'smtp.gmail.com',
            port: Number(env.SMTP_PORT || 465),
            secure: String(env.SMTP_PORT || 465) === '465',
            auth: { user: env.MAIL_USER, pass: env.MAIL_APP_PASSWORD },
          })

          await transporter.sendMail({
            from: `Veda Admissions <${env.MAIL_USER}>`,
            to: env.CONTACT_TO_EMAIL || env.MAIL_USER,
            replyTo: email,
            subject: `New admission application - ${studentName}`,
            text: `Student Name: ${studentName}\nParent's Name: ${parentName}\nEmail: ${email}\nPhone: ${phone}\nCity: ${city}\nClass: ${className}\nPreferred Branch: ${branch}`,
          })

          res.statusCode = 200
          res.setHeader('Content-Type', 'application/json')
          return res.end(JSON.stringify({ message: 'Application submitted successfully. We will contact you soon.' }))
        } catch (error) {
          console.error('Admission form email error:', error)
          res.statusCode = 500
          res.setHeader('Content-Type', 'application/json')
          return res.end(JSON.stringify({ error: 'Unable to submit application right now.' }))
        }
      })
    },
  }
}

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  return {
    plugins: [react(), contactMailPlugin(env)],
  }
})
