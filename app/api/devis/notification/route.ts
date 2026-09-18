import { NextResponse } from "next/server";
import { Resend } from "resend";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      quoteId,
      date,
      serviceType,
      serviceTypeLabel,
      category,
      categoryLabel,
      model,
      country,
      city,
      name,
      phone,
      email,
      company,
      timeframe,
      message,
    } = body;

    const apiKey =
      process.env.RESEND_API_KEY || process.env.NEXT_PUBLIC_RESEND_API_KEY;

    if (!apiKey) {
      console.warn(
        "[DEVIS_EMAIL] Clé API Resend manquante (RESEND_API_KEY / NEXT_PUBLIC_RESEND_API_KEY). L'email n'a pas pu être envoyé."
      );
      return NextResponse.json(
        { success: false, warning: "Clé API Resend non configurée" },
        { status: 200 } // Statut 200 pour ne pas perturber le client
      );
    }

    const resend = new Resend(apiKey);
    const toEmail =
      process.env.RESEND_TO_EMAIL || "contact@forgesdebazas.com";
    const fromEmail =
      process.env.RESEND_FROM_EMAIL ||
      "FORGES DE BAZAS <onboarding@resend.dev>";

    const formattedDate = date
      ? new Date(date).toLocaleString("fr-FR", {
          timeZone: "Africa/Casablanca",
          year: "numeric",
          month: "long",
          day: "numeric",
          hour: "2-digit",
          minute: "2-digit",
        })
      : new Date().toLocaleString("fr-FR");

    const displayService = serviceTypeLabel || serviceType || "Non spécifié";
    const displayCategory = categoryLabel || category || "Non spécifiée";
    const displayModel = model || "Non spécifié";
    const displayCompany = company || "Non spécifiée";
    const displayTimeframe = timeframe || "Non spécifié";
    const displayLocation = [city, country].filter(Boolean).join(", ") || "Non spécifiée";

    const emailHtml = `
<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Nouvelle demande de devis</title>
</head>
<body style="margin: 0; padding: 0; background-color: #f3f4f6; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #1f2937;">
  <table width="100%" border="0" cellspacing="0" cellpadding="0" style="background-color: #f3f4f6; padding: 30px 15px;">
    <tr>
      <td align="center">
        <table width="600" border="0" cellspacing="0" cellpadding="0" style="max-width: 600px; width: 100%; background-color: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 15px rgba(0, 0, 0, 0.08); border: 1px solid #e5e7eb;">
          
          <!-- Header -->
          <tr>
            <td style="background: linear-gradient(135deg, #111827 0%, #1f2937 100%); padding: 30px; text-align: center; border-bottom: 4px solid #dc2626;">
              <h1 style="color: #ffffff; margin: 0 0 6px 0; font-size: 24px; font-weight: 800; letter-spacing: 1px; text-transform: uppercase;">
                FORGES DE BAZAS
              </h1>
              <p style="color: #ef4444; margin: 0; font-size: 13px; font-weight: 700; letter-spacing: 2px; text-transform: uppercase;">
                Nouvelle Demande de Devis
              </p>
            </td>
          </tr>

          <!-- Ref & Date Banner -->
          <tr>
            <td style="background-color: #fef2f2; padding: 16px 30px; border-bottom: 1px solid #fee2e2;">
              <table width="100%" border="0" cellspacing="0" cellpadding="0">
                <tr>
                  <td align="left">
                    <span style="font-size: 12px; color: #991b1b; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px;">Référence</span>
                    <div style="font-size: 16px; color: #dc2626; font-weight: 800; font-family: monospace;">${quoteId || "N/A"}</div>
                  </td>
                  <td align="right">
                    <span style="font-size: 12px; color: #6b7280; font-weight: 500;">Reçue le</span>
                    <div style="font-size: 13px; color: #374151; font-weight: 600;">${formattedDate}</div>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Content Body -->
          <tr>
            <td style="padding: 30px;">

              <!-- Section: Client / Contact -->
              <table width="100%" border="0" cellspacing="0" cellpadding="0" style="margin-bottom: 24px;">
                <tr>
                  <td style="padding-bottom: 12px; border-bottom: 2px solid #f3f4f6;">
                    <h2 style="margin: 0; font-size: 15px; font-weight: 700; color: #111827; text-transform: uppercase; letter-spacing: 0.5px;">
                      Informations Client
                    </h2>
                  </td>
                </tr>
                <tr>
                  <td style="padding-top: 14px;">
                    <table width="100%" border="0" cellspacing="0" cellpadding="6">
                      <tr>
                        <td width="35%" style="font-size: 13px; color: #6b7280; font-weight: 600;">Nom complet :</td>
                        <td style="font-size: 14px; color: #111827; font-weight: 700;">${name || "Non spécifié"}</td>
                      </tr>
                      <tr>
                        <td style="font-size: 13px; color: #6b7280; font-weight: 600;">Société :</td>
                        <td style="font-size: 14px; color: #dc2626; font-weight: 700;">${displayCompany}</td>
                      </tr>
                      <tr>
                        <td style="font-size: 13px; color: #6b7280; font-weight: 600;">Téléphone :</td>
                        <td style="font-size: 14px; color: #111827;">
                          <a href="tel:${phone}" style="color: #dc2626; text-decoration: none; font-weight: 600;">${phone || "Non spécifié"}</a>
                        </td>
                      </tr>
                      <tr>
                        <td style="font-size: 13px; color: #6b7280; font-weight: 600;">Email :</td>
                        <td style="font-size: 14px; color: #111827;">
                          <a href="mailto:${email}" style="color: #dc2626; text-decoration: none; font-weight: 600;">${email || "Non spécifié"}</a>
                        </td>
                      </tr>
                      <tr>
                        <td style="font-size: 13px; color: #6b7280; font-weight: 600;">Localisation :</td>
                        <td style="font-size: 14px; color: #111827; font-weight: 500;">${displayLocation}</td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>

              <!-- Section: Équipement & Service -->
              <table width="100%" border="0" cellspacing="0" cellpadding="0" style="margin-bottom: 24px;">
                <tr>
                  <td style="padding-bottom: 12px; border-bottom: 2px solid #f3f4f6;">
                    <h2 style="margin: 0; font-size: 15px; font-weight: 700; color: #111827; text-transform: uppercase; letter-spacing: 0.5px;">
                       Équipement & Prestation
                    </h2>
                  </td>
                </tr>
                <tr>
                  <td style="padding-top: 14px;">
                    <table width="100%" border="0" cellspacing="0" cellpadding="6">
                      <tr>
                        <td width="35%" style="font-size: 13px; color: #6b7280; font-weight: 600;">Type de service :</td>
                        <td style="font-size: 14px; color: #111827; font-weight: 700;">
                          <span style="display: inline-block; background-color: #fee2e2; color: #991b1b; padding: 3px 10px; border-radius: 9999px; font-size: 12px; font-weight: 700;">
                            ${displayService}
                          </span>
                        </td>
                      </tr>
                      <tr>
                        <td style="font-size: 13px; color: #6b7280; font-weight: 600;">Catégorie :</td>
                        <td style="font-size: 14px; color: #111827; font-weight: 600;">${displayCategory}</td>
                      </tr>
                      <tr>
                        <td style="font-size: 13px; color: #6b7280; font-weight: 600;">Modèle souhaité :</td>
                        <td style="font-size: 14px; color: #111827; font-weight: 600;">${displayModel}</td>
                      </tr>
                      <tr>
                        <td style="font-size: 13px; color: #6b7280; font-weight: 600;">Délai souhaité :</td>
                        <td style="font-size: 14px; color: #111827;">${displayTimeframe}</td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>

              <!-- Section: Message / Remarques -->
              <table width="100%" border="0" cellspacing="0" cellpadding="0">
                <tr>
                  <td style="padding-bottom: 12px; border-bottom: 2px solid #f3f4f6;">
                    <h2 style="margin: 0; font-size: 15px; font-weight: 700; color: #111827; text-transform: uppercase; letter-spacing: 0.5px;">
                      💬 Message & Précisions du client
                    </h2>
                  </td>
                </tr>
                <tr>
                  <td style="padding-top: 14px;">
                    <div style="background-color: #f9fafb; border-left: 4px solid #dc2626; border-radius: 0 8px 8px 0; padding: 14px 18px; font-size: 13px; line-height: 1.6; color: #374151; white-space: pre-wrap;">${message ? message.replace(/</g, "&lt;").replace(/>/g, "&gt;") : "<em>Aucun message spécifique laissé par le client.</em>"}</div>
                  </td>
                </tr>
              </table>

            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background-color: #f9fafb; border-top: 1px solid #e5e7eb; padding: 20px 30px; text-align: center;">
              <p style="margin: 0 0 6px 0; font-size: 12px; color: #6b7280;">
                Notification automatique générée par le site web <strong>FORGES DE BAZAS</strong>
              </p>
              <p style="margin: 0; font-size: 11px; color: #9ca3af;">
                Cette demande est également enregistrée et consultable directement dans votre Backoffice.
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
`;

    const emailText = `
NOUVELLE DEMANDE DE DEVIS - FORGES DE BAZAS
--------------------------------------------
Référence : ${quoteId || "N/A"}
Date : ${formattedDate}

INFORMATIONS CLIENT :
- Nom : ${name || "Non spécifié"}
- Société : ${displayCompany}
- Téléphone : ${phone || "Non spécifié"}
- Email : ${email || "Non spécifié"}
- Localisation : ${displayLocation}

ÉQUIPEMENT & PRESTATION :
- Service : ${displayService}
- Catégorie : ${displayCategory}
- Modèle : ${displayModel}
- Délai : ${displayTimeframe}

MESSAGE DU CLIENT :
${message || "Aucun message spécifique."}
--------------------------------------------
Demande enregistrée dans le Backoffice.
`;

    const { data: resendData, error: resendError } = await resend.emails.send({
      from: fromEmail,
      to: toEmail,
      replyTo: email || undefined,
      subject: "Nouvelle demande de devis - FORGES DE BAZAS",
      html: emailHtml,
      text: emailText,
    });

    if (resendError) {
      console.error("[DEVIS_EMAIL] Erreur Resend:", resendError);
      return NextResponse.json(
        { success: false, error: resendError.message },
        { status: 200 }
      );
    }

    return NextResponse.json({ success: true, id: resendData?.id });
  } catch (err: any) {
    console.error("[DEVIS_EMAIL] Erreur inattendue:", err);
    // Retourne 200 avec success: false pour que le frontend continue toujours
    return NextResponse.json(
      { success: false, error: err?.message || "Erreur interne" },
      { status: 200 }
    );
  }
}

