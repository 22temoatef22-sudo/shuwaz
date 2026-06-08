// Curated list of disposable / temporary email providers.
// Server-only — never shipped to the client.
const DISPOSABLE = new Set<string>([
  "0-mail.com","027168.com","10minutemail.com","10minutemail.net","20minutemail.com",
  "33mail.com","mailinator.com","mailinator.net","mailinator.org","mailinator2.com",
  "tempmail.com","tempmail.net","temp-mail.org","temp-mail.io","tempmailo.com",
  "tempinbox.com","guerrillamail.com","guerrillamail.net","guerrillamail.org",
  "guerrillamail.biz","guerrillamail.de","sharklasers.com","grr.la","spam4.me",
  "yopmail.com","yopmail.net","yopmail.fr","trashmail.com","trashmail.net",
  "trashmail.de","trashmail.io","throwawaymail.com","getairmail.com","getnada.com",
  "mintemail.com","maildrop.cc","mailnesia.com","fakeinbox.com","fakemailgenerator.com",
  "moakt.com","emailondeck.com","mohmal.com","mailcatch.com","spambox.us",
  "spambog.com","mailtothis.com","mailforspam.com","tempr.email","discard.email",
  "discardmail.com","mvrht.net","spamgourmet.com","mytemp.email","mytrashmail.com",
  "anonbox.net","dispostable.com","emailsensei.com","emltmp.com","getonemail.com",
  "harakirimail.com","incognitomail.com","jetable.org","mailexpire.com","mailfreeonline.com",
  "mailme24.com","mailnull.com","mailshell.com","mailtrash.net","mailzilla.com",
  "myspamless.com","nepwk.com","nervmich.net","no-spam.ws","nomail.xl.cx",
  "nospam.ze.tc","nospamfor.us","objectmail.com","pjjkp.com","pookmail.com",
  "rcpt.at","sneakemail.com","sogetthis.com","spam.la","spamavert.com",
  "spambob.com","spambox.com","spamcero.com","spamday.com","spamex.com",
  "spamfree24.com","spamfree24.de","spamfree24.eu","spamfree24.info","spamfree24.net",
  "spamfree24.org","spamhole.com","spaml.com","spaml.de","spammotel.com",
  "spamspot.com","tempemail.net","tempinbox.co.uk","tempymail.com","thisisnotmyrealemail.com",
  "throam.com","trbvm.com","yepmail.net","zoemail.net","zoemail.org",
  "burnermail.io","burnerme.com","mail-temp.com","mailtemp.org","email-temp.com",
  "ezztt.com","mailpoof.com","tempmailaddress.com","etranquil.com","emailfake.com",
  "yandex-mail.ru","fake-mail.ml","crazymailing.com","luxusmail.org","mailtemp.info",
  "instantemailaddress.com","mail.tm","tutamail.tk","disposable.com","disposablemail.com",
  "minuteinbox.com","mailtoaster.com","emailtemporanea.net","mvlmail.com","mailbox80.com",
]);

export function isDisposableEmail(email: string): boolean {
  const at = email.lastIndexOf("@");
  if (at < 0) return false;
  const domain = email.slice(at + 1).trim().toLowerCase();
  if (!domain) return false;
  return DISPOSABLE.has(domain);
}
