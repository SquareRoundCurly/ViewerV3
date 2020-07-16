# ViewerV3 - Specifikáció

## Rövid leírás
A program két főbb funciót lát el :
- Interaktív képnézegető program webes felületen
- Kisebb feladatok automatizálása, ezek vezérlése webes felületen

## Fejlesztési alapelvek
Minden architektúrális döntés, implementációs részlet ezen alapelveket kell, hogy kövesse:
- Átláthatóság, jól dokumentáltság
- Egyszerű kezelés
- Könnyű bővíthetőség

## A kép megjelenítő felület
A képeket több szempont szerint is kell megjeleníteni. A különböző megjelenítések külön oldalon lesznek elérhetőek.
- Kereső oldal : Képek közötti gyors navigálás és szűrés, olyan tulajdonságok alapján, melyek vagy adottak a kép készítésekor (sorozat, típus, stb), vagy később lettek hozzácsatolva (hibajelentés, megjegyzések, stb)
- Rendezett oldal : A fotók egy bizonyos elrendezésbe helyezhetőek ezen az oldalon. Az egyszeri elredezés után új fotók már egyből a megadott elrendezésnek megfelelően jelennek meg.
- Külső betekintés : Amennyiben kívülről szeretnénk bemutatni a képeket, erre is lehetőségünk lesz. Egy link megosztásával betekintést adhatunk a képekhez, illetve azokhoz hozzáfűzött hibajelentésekhez.
- Adminisztratív oldal : Ez az oldal beállításoknak van fenntartva, hogy ne kelljen fájlokat módosítani a leg gyakrabban használt beállítások módosításakor.

## Automatizációs funciók
Képekhez rendelt adatok lekérdezése, képek törlése, átnevezése, stb jellegű adminisztratív feladat, amit a program segít elvégezni. Fontos, hogy az ilyen funciók könnyen bővíthetők, módosíthatók legyenek, hogy ne a programhoz kelljen alkalmazkodni esetleges módosítások esetén. A moduláris felépítés, sciptelhető funciók és a web API mind biztosítják, hogy bővíthető, módosítható és integrálható legyen a program.

## Használt nyelvek, eszközök
Igény van internetes funciókra; lokális, natív funciókra és könnyen módosítható, egyszerű funciók leírására is. Továbbá minden fotóhoz hozzárendelni igen sok adatot. Ezenkívül sok külső eszköz kell, amik biztosítják a program jól dokumentáltságát, tesztelségét illetve a platform független építését & működését.
- Nyelvek : a webes igények megkövetelik a HTML, CSS, JavaScript használatát. A dokumentáció automatikus generálása szintén HTML segítségével történik. A natív modulok, melyek a fájlokon végeznek munkát, C++ - ban lesz leirva. C++ és JavaScript között a webframework fog közvetíteni. A modulok pedig C++ és Pythonban lesznek megírva; C++ a kritkus feladatok elvégzéséhez, Python pedig a gyakran módosított funciók (pl. kép keresés logikája) deklarálására lesz használva. C
- Eszközök : Szükséges egy webframework, ami kezeli a webes funciókat; egy dokumentáció generáló program, ami a kódban levő kommentek alapján létrehoz olvasható dokumentációt; illetve egy build system, ami biztosítja, hogy mindig ugyanazon körülmények között épül meg a program. Ezenkívül saját eszközök is kelleni fognak, mint egy pár teszt program, amiket fejlesztés közben bővítek. Így az esetleges hibák korán előkerülnek, ezáltal egyből javíthatóak. Másik eszköz, mely beépítve lesz a programban, egy profiler. Ez az eszköz segítségével mérhetem az egyes funciók sebességét, ezáltal mindig tudni fogom, hogy az esetleges lassulásokat mi okozza.

## Architektúra
A program felépétését elsősoron a webes funciók ellátása formálja, a központi egység egy web framework, amihez illeszkednek majd a UI felületek (weblapok), illetve különböző automatizációs funciók (modul - ok). A modularitás lehetővé teszi a későbbi bővíthethőség lehetőséget. A legalsó szint (Utility & Automation back end) pedig biztosítja, hogy nem a programhoz kell alkalmazkodni esetleges workflow változásokkor, hanem az könnyen testreszabható. Pl. új mappa elrendezés vagy fáj elnevezési logikákat egy rövid fájl módosításával megadhatunk a rendszernek és az egyből az új logika alapján fog működni. Az ilyen változtatásoknál még csak újra sem kell indítani a programot! Külső eszközök, programok pedig a Web API - n keresztül tudnak kommunikálni a programmal, így az integrálhatóvá válik meglévő és jövőbeli eszközökkel is.
![Architektúra](/Docs/Images/ViewerArchitecture.png)
