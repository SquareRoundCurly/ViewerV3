# Naplo

## 2020-07-16
- Web framework kiválasztása
Node.js lett a választás. Node.js lehetőséget ad egyszerű aszinkron back-end fejlesztésére.
Ami még nagyon fontos, hogy tud C++ dynamikus könyvtárakat (Node.js C++ addon - oknak hivja) betölteni, ezzel biztosítva, hogy natív kódot is tud futtatni a szerveren.
- Hello world weblab fejlesztése
Node.js - t használva web szerverként, egy egyszerű weblapot hoztam létre, hogy lássam, milyen benne dolgozni.
- Bonyolult weblap konstrukciók tesztelése, hogy megvalósítható-e a kiválasztott eszközökkel.
Két bonyolult problémát kell megoldani a webes felületen :
  1. megjeleníteni új tartalmakat az oldal frissítése nélkül
  Pl ha egy új fotó készül el, azt a szervernek észre kell vennie és elküldenie minden weblapnak, ami már nyitva van. Erre egy egyszerű demót hoztam létre és megoldható a kiválasztott eszközökkel.
  2. a layout egyedisége
  A layout nem egy egyszerű táblázat benne képekkel. Mivel minden sorban akárhány kép lehet, más logikára van szükség. A talán leg népszerűbb HTML/CSS/JS könyvtár segítségével (Bootstrap 4) sikerült ezt is megoldani egy demó formájában.
- Most, hogy tudom, hogy a kiválasztott eszközökkel megvalósítható a program, a hét maradék 3 napja ezek a demók integrálásáról fog szólni. A cél, hogy a hét végére bemutatható weblap fusson a böngészőben.
- Esti checkout : tisztított repository, működő Node.JS server, ExpressJS - modullal képeket szolgálok ki egy működő demóban. Amit kell még csinálni a héten: adatbázis választása & integrálása.
