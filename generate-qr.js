
import QRCode from "qrcode";

const websiteUrl = "https://menu-rho-six-51.vercel.app";

QRCode.toFile(
  "website-qr.png",
  websiteUrl,
  {
    width: 1000,
    margin: 4,
    errorCorrectionLevel: "H",
  },
  (error) => {
    if (error) {
      console.error("Помилка генерації QR-коду:", error);
      process.exit(1);
    }

    console.log("QR-код успішно створено!");
  }
);
