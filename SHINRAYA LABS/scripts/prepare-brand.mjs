import sharp from "sharp";
const input = "assets/logo-original.png";
console.log(await sharp(input).metadata());
await sharp(input).webp({ quality: 88 }).toFile("public/logo.webp");
await sharp(input)
  .extract({ left: 295, top: 88, width: 665, height: 742 })
  .resize(160, 160, { fit: "contain", background: "#090909" })
  .webp({ quality: 90 })
  .toFile("public/brand-mark.webp");
await sharp("public/brand-mark.webp")
  .resize(64, 64)
  .png()
  .toFile("src/app/icon.png");
await sharp("public/brand-mark.webp")
  .resize(180, 180)
  .png()
  .toFile("src/app/apple-icon.png");
const original = await sharp(input).resize(630, 630).png().toBuffer();
const svg = Buffer.from(
  `<svg width="1200" height="630" xmlns="http://www.w3.org/2000/svg"><rect width="1200" height="630" fill="#090909"/><text x="65" y="170" font-family="Arial" font-size="18" letter-spacing="3" fill="#d6b799">SHINRAYA TECH LABS</text><text x="65" y="280" font-family="Arial" font-size="65" fill="#f2eee7">Research</text><text x="65" y="355" font-family="Arial" font-size="65" fill="#f2eee7">Beyond</text><text x="65" y="430" font-family="Georgia" font-style="italic" font-size="65" fill="#d6b799">Assumptions.</text></svg>`,
);
await sharp(svg)
  .composite([{ input: original, left: 570, top: 0 }])
  .png()
  .toFile("public/og-image.png");
