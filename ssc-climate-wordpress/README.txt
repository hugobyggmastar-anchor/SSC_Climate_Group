SSC CLIMATE GROUP – WORDPRESS BLOCKTEMA 2.1.0
Uppdaterat 30 oktober 2026

INSTALLERA
1. Använd WordPress 6.6 eller senare och PHP 8.1 eller senare.
2. Öppna Utseende → Teman → Lägg till nytt → Ladda upp tema.
3. Välj SSC-WordPress-paket.zip direkt. Packa inte upp ZIP-filen först.
4. Aktivera temat SSC Climate Group.
5. Öppna Utseende → SSC – kom igång och klicka Importera SSC-webbplatsen.
6. Behåll fliken öppen medan bilder, sidor och produkter importeras.
7. Öppna Inställningar → Permalänkar och spara om serverns länkar ger 404.

REDIGERA
• Sidor: vanliga redigerbara sidor och lösningssidor under Sidor.
• Produkter: eget produktregister under Produkter. Namnet ändras i postens
  titel. Bilden ändras som utvald bild. Öppna panelen SSC produktdata för
  beskrivning, modeller, användningsområden, typ, energikälla, tekniska data,
  egenskaper, dokument och tillval.
• Nyheter och Kundberättelser: egna menyalternativ. Kundutkasten är markerade
  noindex tills godkänt material finns. Ändra detta under SSC sök och delning.
• Sidhuvud och sidfot: Utseende → Redigerare → Design → Mönster → Malldelar.
• Bilder: klicka på ett SSC bild-block och välj/byt bild i mediabiblioteket.
  Rikus tomma bildruta innehåller ett tomt bildblock som kan fyllas senare.
• Återanvändbara mönster: blockinfogaren → Mönster → SSC Climate Group.
• Metabeskrivning och sökstatus: panelen SSC sök och delning i redigeraren.

BLOCKSTRUKTUR
Innehållet är uppdelat i block för layout, text, bilder, länkar, tabeller,
utfällbara sektioner och brödsmulor. Text och bilder redigeras visuellt.
Produktlistor och produktsektioner använder strukturerade WordPress-data.
Det är inte en inbäddad JavaScript-app eller en hel sida i ett HTML-block.
Temats SSC-block behöver temat för att renderas och redigeras.

PRODUKTER OCH FILTER
36 produkter i 6 produktkategorier med 62 modellvarianter från det godkända
produktunderlaget ingår. Ej angivna värden lämnas tomma. Filter matchar typ
OCH energikälla i samma användning av en modell. I WordPress används knappen
Visa produkter för att tillämpa filter; det fungerar även utan JavaScript.
Kategorier följer modellernas användningsområden när produkten sparas.

SENASTE INNEHÅLL
Paketet innehåller lösningstexterna, de nya sid-adresserna, gemensamma
brödsmulor, Daniels telefon och e-post samt knappen Se våra produkter före
kontaktblocket på lösningssidorna. Sidhuvud, sidfot och personal ingår.
Huvudbilden, färgerna och sajtens CSS har följt med.

BEFINTLIG WORDPRESS
Ta först en säkerhetskopia och testa i en kopia av installationen. Importen
skriver inte över andra sidor. Namnkrockar kan därför ge adresser med -2.
En upprepad import av samma paket hoppar över redan importerade poster och
bilder och bevarar redigeringar. Det här är inte en databasbackup från den
befintliga WordPress-servern. Aktiverade plugins och deras inställningar
följer inte med. Om ett äldre SSC-paket redan installerats, testa först så
att äldre poster, block och temaanpassningar kan stämmas av före lansering.

DOKUMENT OCH KONTAKT
Produktblad och manualer läggs till senare via Media och SSC produktdata.
OneDrive-synkronisering är inte aktiverad i detta paket. De befintliga
externa servicelänkarna finns kvar. Kontakt sker via telefon och e-post;
paketet innehåller inget nytt kontaktformulär eller e-postsystem.
Kundberättelserna är fortfarande utkast, utan påhittade kunduppgifter.

TESTSAJT new.sscgroup.fi
Om domänen ännu inte finns i DNS, lägg till följande rad i datorns hosts-fil:
5.44.245.43   new.sscgroup.fi
Windows: C:\Windows\System32\drivers\etc\hosts
macOS/Linux: /etc/hosts
Detta måste göras på din egen dator; temat ändrar ingen hosts-fil.
WordPress-adress och Webbplatsadress ställs in i WordPress på servern.
Temat hårdkodar inte testsajtens domän. Kontrollera HTTPS-certifikatet och
att servern hanterar domänen. Länkar skapas från WordPress egna adresser.

VALIDERING
Se TESTRESULTAT.txt för utförda kontroller. Test på den faktiska servern,
med dess plugins, webbserver och mediafunktioner, återstår före lansering.
