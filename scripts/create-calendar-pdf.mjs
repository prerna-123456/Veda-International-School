import fs from 'node:fs'
import path from 'node:path'

const rows = [
  ['June', 'New academic session and orientation'],
  ['July - September', 'First term classes, assessments and activities'],
  ['October', 'Term break and cultural celebrations'],
  ['November - December', 'Second term classes and examinations'],
  ['January', 'Republic Day and winter activities'],
  ['February - March', 'Annual examinations and co-curricular events'],
  ['April - May', 'Session closing and summer vacation'],
]

const escapePdf = value => value.replaceAll('\\', '\\\\').replaceAll('(', '\\(').replaceAll(')', '\\)')
const text = (value, x, y, size = 12, font = 'F1') => `BT /${font} ${size} Tf ${x} ${y} Td (${escapePdf(value)}) Tj ET`
const commands = [
  text('Veda International School', 54, 748, 22, 'F2'),
  text('Academic Calendar - Academic Year 2026-27', 54, 720, 14, 'F2'),
  '0.78 0.12 0.44 RG 1.5 w 54 706 m 558 706 l S',
  text('Please confirm final dates with the school office, as dates may change.', 54, 678, 11),
  text('Period', 54, 638, 12, 'F2'),
  text('Academic Schedule', 190, 638, 12, 'F2'),
]

rows.forEach(([period, schedule], index) => {
  const y = 608 - index * 42
  commands.push('0.88 0.88 0.88 RG 0.6 w 54 ' + (y - 12) + ' m 558 ' + (y - 12) + ' l S')
  commands.push(text(period, 54, y, 11, 'F2'))
  commands.push(text(schedule, 190, y, 11))
})

const stream = commands.join('\n')
const objects = [
  '<< /Type /Catalog /Pages 2 0 R >>',
  '<< /Type /Pages /Kids [3 0 R] /Count 1 >>',
  '<< /Type /Page /Parent 2 0 R /MediaBox [0 0 612 792] /Resources << /Font << /F1 4 0 R /F2 5 0 R >> >> /Contents 6 0 R >>',
  '<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>',
  '<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold >>',
  `<< /Length ${Buffer.byteLength(stream, 'utf8')} >>\nstream\n${stream}\nendstream`,
]

let pdf = '%PDF-1.4\n'
const offsets = [0]
objects.forEach((object, index) => {
  offsets.push(Buffer.byteLength(pdf, 'utf8'))
  pdf += `${index + 1} 0 obj\n${object}\nendobj\n`
})
const xrefOffset = Buffer.byteLength(pdf, 'utf8')
pdf += `xref\n0 ${objects.length + 1}\n0000000000 65535 f \n`
for (let index = 1; index <= objects.length; index += 1) pdf += `${String(offsets[index]).padStart(10, '0')} 00000 n \n`
pdf += `trailer\n<< /Size ${objects.length + 1} /Root 1 0 R >>\nstartxref\n${xrefOffset}\n%%EOF\n`

const outputPath = path.resolve('public', 'academic-calendar.pdf')
fs.mkdirSync(path.dirname(outputPath), { recursive: true })
fs.writeFileSync(outputPath, pdf)
console.log(`Created ${outputPath}`)
