const ORDRE=["lundi","mardi","mercredi","jeudi","vendredi","samedi","dimanche"];
const NOMS=["dimanche","lundi","mardi","mercredi","jeudi","vendredi","samedi"];
const PLAN={lundi:"repos",mardi:"bas",mercredi:"dos",jeudi:"repos",vendredi:"cardio",samedi:"repos",dimanche:"haut"};
const SEANCES={
bas:{titre:"Bas du corps",mission:"Jambes et fessiers solides, sans saut et sans agresser le genou.",w:45,r:15,n:3,echauff:[{nom:"Marche rapide sur place",sec:30},{nom:"Mobilité des chevilles",sec:20},{nom:"Flexions de genou partielles",sec:20},{nom:"Pont de hanches",sec:25},{nom:"Squats poids du corps",sec:25}],
exos:[
{id:"goblet",nom:"Goblet squat",muscle:"Quadriceps, fessiers",kg:8,m:1,tip:"Haltère contre la poitrine. Descente 3 s, remontée dynamique."},
{id:"sdt",nom:"Soulevé de terre roumain",muscle:"Ischio-jambiers, fessiers",kg:6,m:2,tip:"Dos plat, hanches vers l'arrière. Un haltère par main."},
{id:"fente",nom:"Fente arrière sur le step",muscle:"Quadriceps, fessiers",kg:4,m:2,tip:"Si le genou proteste : réduis l'amplitude."},
{id:"pont",nom:"Pont de hanches lesté",muscle:"Fessiers",kg:8,m:1,tip:"Haltère sur les hanches, serre les fessiers en haut."},
{id:"mollets",nom:"Mollets sur la marche",muscle:"Mollets",kg:6,m:2,tip:"Talons dans le vide, montée lente."}],
conseils:["Le genou suit l'axe du pied.","Contrôle la descente, ne te laisse pas tomber.","Douleur au-dessus de 3-4/10 : réduis l'amplitude ou remplace l'exercice.","Aucun saut."]},
dos:{titre:"Dos, épaules et bras",mission:"Une carrure plus large : dos épais, épaules rondes, bras gonflés.",w:45,r:15,n:3,echauff:[{nom:"Rotations des épaules",sec:20},{nom:"Rotations des poignets",sec:20},{nom:"Cercles des bras",sec:20},{nom:"Rowing à vide",sec:30},{nom:"Curl très léger",sec:30}],
exos:[
{id:"rowing",nom:"Rowing haltères",muscle:"Dos",kg:6,m:2,tip:"Tire avec le coude, pas avec la main."},
{id:"curl",nom:"Curl biceps alterné",muscle:"Biceps",kg:4,m:2,tip:"Pas d'élan : si tu te balances, c'est trop lourd."},
{id:"oiseau",nom:"Oiseau",muscle:"Arrière d'épaules",kg:2,m:2,tip:"Poids léger, sensation dans l'arrière d'épaule."},
{id:"lateral",nom:"Élévations latérales",muscle:"Épaules",kg:2,m:2,tip:"Monte à hauteur d'épaules, épaules basses."},
{id:"marteau",nom:"Curl marteau",muscle:"Biceps, avant-bras",kg:4,m:2,tip:"Coudes collés, contrôle la descente."}],
conseils:["Ne balance jamais le dos.","Le mouvement vient du coude.","Priorité à la sensation, pas à la charge."]},
cardio:{titre:"Full body cardio",mission:"Tout le corps, le souffle qui monte, sans impact et sans bruit.",w:45,r:15,n:3,echauff:[{nom:"Marche rapide, bras en mouvement",sec:30},{nom:"Rotations épaules et poignets",sec:20},{nom:"Squats poids du corps",sec:25},{nom:"Pont de hanches",sec:20},{nom:"Pompes sur les genoux",sec:25}],
exos:[
{id:"thruster",nom:"Thruster (squat + développé)",muscle:"Jambes, épaules",kg:4,m:2,tip:"Enchaîne fluide, sans saut."},
{id:"shadow",nom:"Shadow boxing",muscle:"Cardio, épaules",kg:1,m:2,tip:"Haltères de 1 kg ou à vide, ancré au sol."},
{id:"stepup",nom:"Step-up dynamique",muscle:"Jambes, cardio",kg:4,m:2,tip:"Montée rapide, descente contrôlée."},
{id:"pompes",nom:"Pompes",muscle:"Pectoraux, triceps",kg:0,tip:"Sur les genoux si la forme se dégrade."},
{id:"mountain",nom:"Mountain climbers lents",muscle:"Abdos, cardio",kg:0,tip:"Genoux vers la poitrine, sans sauter."}],
conseils:["Enchaîne proprement, pas vite à tout prix.","Aucun saut, aucun mouvement bruyant."]},
haut:{titre:"Haut du corps",mission:"Pectoraux puissants, triceps solides, épaules plus larges.",w:45,r:15,n:3,echauff:[{nom:"Rotations des épaules",sec:20},{nom:"Rotations des poignets",sec:20},{nom:"Cercles des bras",sec:20},{nom:"Pompes contre un mur",sec:30},{nom:"Développé haltères très léger",sec:30}],
exos:[
{id:"dev",nom:"Développé couché au sol",muscle:"Pectoraux",kg:8,m:2,tip:"Descente 3 s, montée explosive."},
{id:"ecartes",nom:"Écartés haltères au sol",muscle:"Pectoraux",kg:4,m:2,tip:"Coudes légèrement fléchis."},
{id:"mili",nom:"Développé militaire",muscle:"Épaules",kg:6,m:2,tip:"Ne cambre pas le dos."},
{id:"pompes",nom:"Pompes",muscle:"Pectoraux, triceps",kg:0,tip:"Propres, sans échec."},
{id:"triceps",nom:"Extension triceps derrière la tête",muscle:"Triceps",kg:6,m:1,tip:"Coudes serrés près de la tête."}],
conseils:["Les épaules ne montent jamais vers les oreilles.","Haltères toujours contrôlés.","Trop léger ? Ralentis le tempo ou passe en unilatéral."]},
repos:{titre:"Mobilité",mission:"Jour de repos : quelques minutes pour délier le corps.",w:40,r:5,n:1,echauff:[],type:"repos",
exos:[
{id:"epaules",nom:"Cercles d'épaules et de bras",muscle:"Épaules",kg:0,tip:"Grands cercles lents."},
{id:"chat",nom:"Chat-vache",muscle:"Dos, colonne",kg:0,tip:"Au sol à quatre pattes, respire."},
{id:"hanches",nom:"Fente basse, étirement hanches",muscle:"Hanches",kg:0,tip:"20 s par côté."},
{id:"ischios",nom:"Étirement ischio-jambiers",muscle:"Ischio-jambiers",kg:0,tip:"Assis, dos long."},
{id:"pecs",nom:"Étirement pectoraux au mur",muscle:"Pectoraux",kg:0,tip:"20 s par côté."}],
conseils:["Pas d'effort : respire et relâche."]}};
const MATIN=["Gel Anti-Spot","Cleanance Comedomed","Soin hydratant L'Oréal"];
const SOIR={lundi:["Gommage (douche)","Cleanance Comedomed","Nivea Crème"],jeudi:["Gommage (douche)","Cleanance Comedomed","Nivea Crème"],
mercredi:["Gel Anti-Spot","Lotion purifiante","Cleanance Comedomed","Nivea Crème"]};
const SOIR_DEFAUT=["Gel moussant (douche)","Cleanance Comedomed","Nivea Crème"];
