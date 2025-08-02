import {
  PROJECT_LOGO,
  PROJECT_NAME,
  CUSTOMER_SUPPORT_EMAIL,
} from "../miscellaneous/constants";

export const sendParcelUpdateEmail = ({
  customerName,
  trackingId,
  updateMessage,
  updatedAt,
  trackingLink,
}: {
  customerName: string;
  trackingId: string;
  updateMessage: string;
  updatedAt: string;
  trackingLink: string;
}) => {
  return `
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>${PROJECT_NAME} - Parcel Update</title>
  </head>
  <body style="margin: 0; padding: 0; background: #f5f9ff; font-family: Arial, sans-serif;">
    <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f5f9ff; padding: 20px;">
      <tr>
        <td align="center">
          <table width="100%" cellpadding="0" cellspacing="0" style="max-width: 520px; background: #ffffff; border-radius: 10px; overflow: hidden; box-shadow: 0 6px 12px rgba(0,0,0,0.06);">
            <tr>
              <td align="center" style="padding: 30px 20px 10px;">
                <img src="${PROJECT_LOGO}" alt="${PROJECT_NAME} Logo" style="width: 80px; margin-bottom: 10px;" />
                <h2 style="margin: 10px 0; font-size: 22px; color: #333;">Hey ${customerName}, here's an update!</h2>
              </td>
            </tr>
            <tr>
              <td style="padding: 0 30px 20px;">
                <p style="font-size: 15px; color: #555; line-height: 1.6;">
                  ${updateMessage}
                </p>

                <div style="margin: 20px 0; padding: 15px; background: #f1f5fb; border-radius: 6px; text-align: center;">
                  <p style="margin: 0; font-size: 14px; color: #444;">
                    <strong>Tracking ID:</strong> ${trackingId}<br/>
                    <strong>Updated On:</strong> ${updatedAt}
                  </p>
                </div>

                <div style="text-align: center; margin-top: 25px;">
                  <a href="${trackingLink}" target="_blank" style="display: inline-block; padding: 12px 24px; background-color: #1d72e8; color: #fff; font-size: 15px; border-radius: 5px; text-decoration: none; font-weight: 500;">
                    Track Your Parcel
                  </a>
                </div>

                <p style="font-size: 13px; color: #888; margin-top: 30px; text-align: center;">
                  If you have any questions or need help, just reply to this email or contact us at
                  <a href="mailto:${CUSTOMER_SUPPORT_EMAIL}" style="color: #1d72e8;">${CUSTOMER_SUPPORT_EMAIL}</a>.
                </p>
              </td>
            </tr>
            <tr>
              <td style="background: #f8f9fb; padding: 15px; text-align: center; border-top: 1px solid #e1e7f0;">
                <p style="margin: 0; font-size: 12px; color: #aaa;">
                  &copy; ${new Date().getFullYear()} ${PROJECT_NAME}. All rights reserved.
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
};
