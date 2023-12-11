# Netflix 4.0

## Projektbeskrivning

Ni ska tillsammans skapa en hemsida likt Netflix där man välja och söka bland olika tillgängliga filmer. Filmerna behöver dock av naturliga skäl inte kunna spelas upp. Istället ska man kunna se en sammanfattning och lite annan information.

### Features [G]

Samtliga features måste vara implementerade för ett G. Sidan är uppdelad i fyra sidor: hem, kategori, bokmärkta och en film-view. Indata finns i `movies.json`.

#### Hem

- [x] Det ska finnas en sektion "Trending" där man kan se några olika filmer som trendar just nu.

- [x] Det ska finnas en sektion "Recommended for you" där 4-10 rekommenderade filmer visas. Dessa kan ni slumpa fram. Du får dock inte rekommendera en film som finns någon annanstans i flödet, exempelvis i trending.

- [x] Både "Trending" och "Recommended for you" ska ligga i en Carousel.

- [x] Det ska finnas ett sökfält där man kan söka bland tillgängliga filmer.

- [x] Om inte thumbnailen fungerar bör man använda en placeholder.

#### Kategori

- [ ] Användaren möts av en skärm där man kan välja bland alla tillgängliga kategorier. Tänk på att fler kategorier kan tillkomma i framtiden.

#### Bokmärkta

- [ ] Här ska du kunna se alla dina bokmärkta filmer.

- [ ] Bokmärkningen ska kunna hålla igenom en hel session. Man ska alltså kunna refresha sidan.

#### Film-view

- [x] Hit kommer man om man klickar på en thumbnail.

- [x] Här ska all information som finns om filmen i data.json visas.

- [x] Man ska också kunna bokmärka eller ta bort bokmärkningen från filmen.

#### För alla views

- [x] Klickar man på en thumbnail för en film ska man gå till film-viewen för den aktuella filmen.

- [x] Man ska kunna bokmärka en film från thumbnailen.

- [ ] Alla sidor ska vara mobilanpassade.

- [x] Vid varje thumbnail ska årtal och åldergräns visas på filmen.

- [ ] Man ska kunna navigera mellan olika sidor på ett intuitivt sätt.

### Testning

#### G

- [ ] Applikationen ska vara väl testad med enhets- och/eller integrationstester.

### Deployment

#### G

- [ ] Applikationen ska vara uppe på en extern URL. Använd förslagsvis GitHubPages.

#### VG

- [ ] Applikationen har en automatiserad deployment via exempelvis GitHubActions.

- [ ] Applikationen har automatiska kontroller för att förhindra att dålig kod går igenom Pull Requests.

### Workflow

#### G

- [ ] Nya features implementeras huvudsakligen via Pull Requests.

- [ ] Gruppen följer en konsekvent kodningsstil.

#### VG

- [ ] Gruppen har en historik i main som är lätt att följa. Historik i era egna branches är irrelevant.

- [ ] Gruppen har lagt fram Pull Requests som är enkla att förstå och ge förslag till.

- [ ] Gruppen har granskat inkommande Pull Requests väl och ger förslag på förbättringar där det finns möjlighet.

- [ ] Projektets arbetsgång är i övrigt lätt att följa.

### Vänligen notera att:

- För många oskäliga pushes direkt till main kommer resultera i ett underkänt projekt.

- Pull Requests får i regel inte godkännas av samma person som lade fram den.

- Varje individ måste bidra med ett skäligt antal Pull Requests.

- Individer som inte bidragit tillräckligt mycket till projektet kan ensamt underkännas, medan övriga i gruppen erhåller ett godkänt/väl godkänt betyg.

- Jag vill bli inbjuden till repot med adminrättigheter från början. Jag kommer endast att kika på historiken i main, Pull Requests och Issues. Era egna branches kommer inte utgöra bedömningsunderlag.

- Tester ska skrivas tillsammans med koden. Alltså direkt före eller direkt efter implementationen. I commits och Pull Requests ska det finnas bra testcases också.

- Refaktorering är vanligt. Jag förväntar mig inte att ni ska ha skrivit den perfekta komponenten från början. Jag är mer intresserad av arbetsflödet.

### Övrigt

Det kommer sannolikt att begås misstag under projektets gång och det är en naturlig del av arbetet som utvecklare. Pull Requests med buggar och/eller som förvirrar historiken kommer sannolikt att gå igenom vid enstaka tillfällen.

Varje grupp ges _möjlighet_ att göra en skriftlig inlämning där man kan resonera kring vad som gått fel, vilka kriterier som brutits och vad man göra för att förbättra det till nästa gång. Om man gör ett misstag betyder det inte att gruppen inte kan nå de högre kraven. Man behöver då istället resonera väl och peka ut misstagen som begåtts och vad som skulle gjorts annorlunda. Jag vill i en eventuell inlämning alltså ha:

- Vilka misstag som begåtts.
- Vad man skulle gjort annorlunda.
- Om man kan göra något för att förhindra detta i framtiden.

Stöd gärna detta med referenser till commits och skärmdumpar så att jag lätt kan förstå situationen.

Inlämningen är inte obligatorisk. Grupper kan uppnå ett väl godkänt betyg utan inlämningen, givet att de haft ett bra arbetsflöde.

Om det råder oenighet (eller ovilja) i gruppen om upplägget av arbetsflöde kan enskilda medlemmar i gruppen antingen ensamt eller tillsammans skriva ovanstående inlämning med resonemang om processen. Enskilda elever kan då uppnå ett högre betyg givet att de i övrigt har bidragit mycket till projektet.

### Tips

1. Börja med att bjuda in mig i repot.
2. Börja sedan med att göra era issues. Gör dem så små och avgränsade som möjligt. Lägg upp en preliminär plan, och var beredd på att justera den preliminära planen efter projektets gång. Ni kommer komma på fler Issues med projektets gång, det är en naturlig del av agil utveckling.
3. Gör en basic plan för er arkitektur. Vilka komponenter ska finnas med? Hur ska data flöda emellan dem? Var inte rädd för fail-fast och sedan göra om.
4. Hur delar man upp projektet? Se till att ha ett upplägg som gör er så obereonde av varandra som möjligt.
5. Merga små branches ofta, snarare än stora branches sällan. Det ger er möjlighet att undvika många merge conflicts.
6. Börja med deployment-pipelinen direkt. Det är mycket lättare att deploya småprojekt än stora. Jobbar man agilt så sätter man upp GitHub Actions pararellt med utvecklingen.
7. Boka in handledning med mig och förbered frågor, det kommer hjälpa er.
8. Rebasa din egen branch så fort någonting hänt på main. Kommunicera därför gärna med varandra om någonting hänt på main.
9. Dagliga möten underlättar enormt. Kom överens om hur ni ska kommunicera!
10. Någon kommer sannolikt behöva ta ansvar för att skriva de stora integrationstesterna.
