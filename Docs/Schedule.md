# 8 Week plan

## Week 1 - Infrastruktúra lefektetése
- [x] Maintenance : Git repository felállítása
- [x] Docs : Specifikáció megírása, eszközök kiválasztása
- [x] Döntés : Web framework kiválasztása (c++ & web framework lib / Node.js & c++ addons)
- [x] Init : Repository kitisztítása (előző prototípus eltávolítása)
- [x] Döntés : Build system kiválasztása
- [x] Init : Eszközök, tech stack integrálása megfelelő fejlesztői környezetben
- [x] Demo : Egyszerű web server építése, egyszerű weblap építése
- [x] Init : Teszt képek lokális gyűjteménye / file server connection
- [x] Demo : Képek betöltése szerver oldalról
- [x] Demo : képek dinamikus betöltése
- [x] Demo : server - client & client - server kommunikació socket technológiával

## Week 2 - Fotók beolvasása, keresés web felületen
- [x] Weblap : Bootstrap navbar
- [x] Döntés : Adatbázis kiválasztása & összekötése a web framework - el
- [x] DB : Beolvassa a fotók meta adatit a fájlnév, direktory alapján; adatbázisban helyezi el az adatot
- [x] Weblap & server & DB : fotók kereső felület weblapon
- [x] Weblap : dinamikus foto toltes
- [x] Weblap : landing page animacioval
- [x] Weblap & server : ket iranyu dinamikus adat kozles
- [x] Weblap & server : oldalak közötti navigáció

## Week 3 - Layouts, webes rendezés
- [ ] Döntés : Dokumentáció generáló eszköz kiválasztása
- [ ] Demo : Demo modul és kernel építése
- [ ] Init : Teszt framework kiválasztása, teszt környezet kifejlesztése
- [ ] Docs : Build & Use instrukciók leírása, dokumentálás
- [ ] Test : Teszt írása a képbeolvasó modul - hoz
- [ ] Test : Weblap teszt
- [ ] Weblap : cloudflare fallback system https://www.hanselman.com/blog/CDNsFailButYourScriptsDontHaveToFallbackFromCDNToLocalJQuery.aspx
- [x] Weblap : draggable layout
- [x] Weblap : n size elements
- [ ] Weblap : draggable layout fotokkal
- [ ] Server : de/serialise layout
- [ ] DB : Layout tárolása adatbázisban
- [ ] Weblap & server & DB : layout szerkesztése webes felületen
- [ ] Test : Layout test
- [ ] Test : Layout weblap teszt

## Week 4 - Access control
- [ ] DB : access control
- [ ] Weblap & server : Login page, szabályoknak megfelelően kezelni a login auth. - ot
- [ ] Test : Login teszt

## Week 5 - Javítás, kód tisztítás, elmaradt funciók implementálása
- [ ] Maintenace : Bugfixes
- [ ] Docs : dokumentáció generáló kommentek frissítése, kiegészítése
- [ ] DB & Weblap & server : Layout ne csak egy grid legyen, egy sorban több / kevesebb fotó is lehessen
- [ ] Weblap : szépítés, modern js lib - ek keresése & haszálata
- [ ] Weblap : tesztelés több böngészőben; telefon képernyőtől 4K monitorokig
- [ ] Döntés : profiler rendszer kiválasztása
- [ ] Maintenace : profiler integrálása a teljes tech. stack - ben
- [ ] Test : update tests


## Week 6 - Hibajelentés & meta adat
- [ ] DB : hibajelentés a fotókhoz csatolva
- [ ] Weblap & server & DB : fotók hibajelentése, hozzácsatolt meta adatok tárolása
- [ ] Weblap & server : hibajelentés funció integrálása az access control systemmel
- [ ] Weblap & server : hibajelentés funció integrálása a layout & search oldalakkal
- [ ] Test : hibajelentés funció tesztelése
- [ ] DB : fotók relációinak feljegyzése, nagyított képek, etc adatbázisban fenntartása
- [ ] Weblap & server : nagyított fotók megjelenítése

## Week 7 - Adminisztráció & extenzibilitás
- [ ] Website : admin oldal / sidebar
- [ ] DB : admin beállítások
- [ ] Weblap & server & DB : admin beállítások
- [ ] Modul & Maintenance : modulok frissítése, modulokból közös kód kiemelése egy ViewerLib közös könyvtárba
- [ ] Modul : egy python interpreter beágyazása a közös ViewerLib könyvtárba
- [ ] Modul : python interfész deklarálása
- [ ] Extenzibilitás : modulokból kiválasztani a gyakran módosított funciókat, portolás python scriptekre
- [ ] Test : python interpreter teszt

## Week 8 - Integrálás, Deployment & kód tisztítás, dokumentáció fenntartása
- [ ] Modul : web API modul írása, web API interfész deklarárlása
- [ ] Demo & Integration : Demo AHK script írása, ami bemutatja az új web API működését
- [ ] Demo & Integration : Telepített programok megnyitása böngészőből
- [ ] Maintenace : Bugfixes
- [ ] Maintenace : kód fenntartása
- [ ] Docs : dokumentáció generáló kommentek frissítése, kiegészítése
- [ ] Test : tesztek frissítése
- [ ] Deployment : deployment dokumentáció írása
- [ ] Deployment : deployment scriptek írása

