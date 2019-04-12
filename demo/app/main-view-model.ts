import { Observable } from 'tns-core-modules/data/observable';
import { FilterableListpicker } from 'nativescript-filterable-listpicker';
import * as frame from "tns-core-modules/ui/frame";
import { Page } from 'tns-core-modules/ui/frame';
import * as  http from "tns-core-modules/http";
    
let API_KEY = "__YOUR_GOOGLE_API_KEY__";
let placesApiUrl = 'https://maps.googleapis.com/maps/api/place/autocomplete/json'
let placesDetailsApiUrl = 'https://maps.googleapis.com/maps/api/place/details/json'
let MyModel;

export class HelloWorldModel extends Observable {
    public selection: string;
    private filterableListpicker: FilterableListpicker;
    private page: Page;
    constructor(page: Page) {
        super();
        this.page = page;
        MyModel = this;
    }
    
    private languages = ["A# .NET","A# (Axiom)","A-0 System","A+","A++","ABAP","ABC","ABC ALGOL","ABSET","ABSYS","ACC","Accent","Ace DASL (Distributed Application Specification Language)","ACL2","ACT-III","Action!","ActionScript","Ada","Adenine","Agda","Agilent VEE","Agora","AIMMS","Aldor","Alef","ALF","ALGOL 58","ALGOL 60","ALGOL 68","ALGOL W","Alice","Alma-0","AmbientTalk","Amiga E","AMOS","AMPL","AngelScript","APL","App Inventor for Android's visual block language","AppleScript","APT","Arc","ARexx","Argus","AspectJ","Assembly language","ATS","Ateji PX","AutoHotkey","Autocoder","AutoIt","AutoLISP / Visual LISP","Averest","AWK","Axum","Active Server Pages","B","Babbage","Bash","BASIC","bc","BCPL","BeanShell","Batch (Windows/Dos)","Bertrand","BETA","Bistro","BLISS","Blockly","BlooP","Boo","Boomerang","BPEL","Business Basic","C","C--","C/AL","Caché ObjectScript","C Shell (csh)","Caml","Cayenne","CDuce","Cecil","Cesil","Céu","Ceylon","CFEngine","CFML","Cg","Ch","Chapel","Charity","Charm","CHILL","CHIP-8","chomski","ChucK","Cilk","Citrine","Claire","Clarion","Clean","Clipper","CLIPS","CLIST","Clojure","CLU","CMS-2","Cobra","CODE","CoffeeScript","ColdFusion","COMAL","COMIT","COMPASS","Component Pascal","COMTRAN","Converge","Cool","Coq","Coral 66","CorVision","COWSEL","CPL","Cryptol","Crystal","Csound","CSP","CUDA","Curl","Curry","Cybil","Cyclone","Cython","Dart","DataFlex","Datalog","DATATRIEVE","dBase","dc","DCL","Delphi","DinkC","DIBOL","Dog","Draco","DRAKON","Dylan","DYNAMO","Ease","Easy PL/I","EASYTRIEVE PLUS","ECMAScript","Edinburgh IMP","EGL","Eiffel","ELAN","Elixir","Elm","Emacs Lisp","Emerald","Epigram","EPL (Easy Programming Language)","Erlang","es","Escher","ESPOL","Esterel","Etoys","Euclid","Euler","Euphoria","EusLisp Robot Programming Language","EXEC 2","Executable UML","F#","F*","Factor","Falcon","Fantom","FAUST","FFP","Fjölnir","FL","Flavors","Flex","FlooP","FLOW-MATIC","FOCAL","FOCUS","FOIL","FORMAC","@Formula","Forth","Fortress","FoxBase","FoxPro","FP","Franz Lisp","Frege","F-Script","Game Maker Language","GameMonkey Script","GAMS","GAP","G-code","GDScript","Genie","GDL","GJ","GEORGE","GLSL","GNU E","GM","Go","Go!","GOAL","Gödel","Golo","GOM (Good Old Mad)","Google Apps Script","Gosu","GOTRAN","GPSS","GraphTalk","GRASS","Groovy","Hack","HAGGIS","HAL/S","Halide (programming language)","Hamilton C shell","Harbour","Hartmann pipelines","Haskell","Haxe","Hermes","High Level Assembly","HLSL","Hop","Hopscotch","Hope","Hugo","Hume","HyperTalk","IBM Basic assembly language","IBM HAScript","IBM Informix-4GL","IBM RPG","ICI","Icon","Id","IDL","Idris","IMP","Inform","INTERLISP","Io","Ioke","IPL","IPTSCRAE","ISLISP","ISPF","ISWIM","J#","J++","JADE","JAL","Janus (concurrent constraint programming language)","Janus (time-reversible computing programming language)","JASS","Java","JavaScript","JCL","JEAN","Join Java","JOSS","Joule","JOVIAL","Joy","JScript","JScript .NET","JavaFX Script","Julia","Jython","Kaleidoscope","Karel","Karel++","KEE","Kixtart","Klerer-May System","KIF","Kojo","Kotlin","KRC","KRL","KRYPTON","ksh","Kodu","LabVIEW","Ladder","Lagoona","LANSA","Lasso","LaTeX","Lava","LC-3","Leda","Legoscript","LIL","LilyPond","Limbo","Limnor","LINC","Lingo","LIS","LISA","Lisaac","Lite-C","Lithe","Little b","Logo","Logtalk","LotusScript","LPC","LSE","LSL","LiveCode","LiveScript","Lua","Lucid","Lustre","LYaPAS","Lynx","M2001","M4","M#","Machine code","MAD/I","Magik","Magma","make","Maude system","Maple","Mary","MASM Microsoft Assembly x86","MATH-MATIC","Mathematica","MATLAB","Maya (MEL)","MDL","Mercury","Mesa","Metafont","MetaQuotes Language (MQL4/MQL5)","MHEG-5 (Interactive TV programming language)","Microcode","MicroScript","MIIS","Milk (programming language)","MIMIC","Mirah","Miranda","MIVA Script","ML","Model 204","Modelica","Modula","Modula-2","Modula-3","Mohol","MOO","Mortran","Mouse","MPD","Mathcad","IL","MSL","MUMPS","MuPAD","NASM","Napier88","Neko","Nemerle","nesC","NESL","Net.Data","NetLogo","NetRexx","NewLISP","NEWP","Newspeak","NewtonScript","NGL","Nial","Nice","Nim","NPL","NSIS","Nu","NWScript","NXT-G","o:XML","Oak","Oberon","OBJ2","Object Lisp","ObjectLOGO","Object REXX","Object Pascal","Objective-C","Objective-J","Obliq","OCaml","occam","occam-π","Octave","OmniMark","Onyx","Opa","Opal","OpenCL","OpenEdge ABL","OPL","OpenVera","OPS5","OptimJ","Orc","ORCA/Modula-2","Oriel","Orwell","Oxygene","Oz","P","P#","ParaSail (programming language)","PARI/GP","","PCASTL","PCF","PEARL","PeopleCode","Perl","PDL","Perl 6","Pharo","PHP","Pico","Picolisp","Pict","Pike","PIKT","PILOT","Pipelines","Pizza","PL-11","PL/0","PL/B","PL/C","PL/M","PL/P","PL/SQL","PL360","PLANC","Plankalkül","Planner","PLEX","PLEXIL","Plus","POP-11","POP-2","PostScript","PortablE","Powerhouse","PowerShell","PPL","Processing","Processing.js","Prograph","PROIV","Prolog","PROMAL","Promela","PROSE modeling language","PROTEL","ProvideX","Pro*C","Pure","Pure Data","Python","Q (equational programming language)","Q (programming language from Kx Systems)","Qalb","QBasic","QtScript","QuakeC","QPL","R++","Racket","RAPID","Rapira","Ratfiv","Ratfor","rc","REBOL","Red","Redcode","REFAL","Reia","REXX","Ring","Rlab","ROOP","RPG","RPL","RSL","RTL/2","Ruby","RuneScript","Rust","S2","S3","S-Lang","S-PLUS","SA-C","SabreTalk","SAIL","SALSA","SAM76","SAS","SASL","Sather","Sawzall","SBL","Scala","Scheme","Scilab","Scratch","Script.NET","Sed","Seed7","Self","SenseTalk","SequenceL","SETL","SIMPOL","SIGNAL","SiMPLE","SIMSCRIPT","Simula","Simulink","Singularity","SISAL","SLIP","SMALL","Smalltalk","Small Basic","SML","Strongtalk","Snap!","Snowball","SOL","Solidity","SPARK","Speedcode","SPIN","SP/k","SPS","SQR","Squeak","Squirrel","SR","S/SL","Stackless Python","Starlogo","Strand","Stata","Stateflow","Subtext","SuperCollider","SuperTalk","Swift (Apple programming language)","Swift (parallel scripting language)","SYMPL","SyncCharts","SystemVerilo","TACL","TACPOL","TADS","TAL","Tcl","Tea","TECO","TELCOMP","TeX","TEX","TIE","Timber","Tom","TOM","Toi","Topspeed","TPU","Trac","TTM","T-SQL","Transcript","TTCN","Turing","TUTOR","TXL","TypeScript","Ubercode","UCSD Pascal","Umple","Unicon","Uniface","UNITY","Unix shell","UnrealScript","Vala","Verilog","VHDL","Visual Basic","Visual Basic .NET","Visual DataFlex","Visual DialogScript","Visual Fortran","Visual FoxPro","Visual J++","Visual J#","Visual Objects","Visual Prolog","VSXu","vvvv","WATFIV, WATFOR","WebDNA","WebQL","Whiley","Windows PowerShell","Winbatch","Wolfram Language","Wyvern","X10","XBL","xHarbour","XL","Xojo","XOTcl","XPL","XPL0","XQuery","XSB","XSharp","ath","Xtend","X++","Yorick","YQL","Yoix","Z notation","Zeno","ZOPL","Zsh","ZPL"];
    private objArray = [
        {
            "image": "https://lh3.googleusercontent.com/gN6iBKP1b2GTXZZoCxhyXiYIAh8QJ_8xzlhEK6csyDadA4GdkEdIEy9Bc8s5jozt1g=w300",
            "title": "Brown Bear",
            "description": "Brown bear brown bear, what do you see?"
        },
        {
            "image": "http://icons.veryicon.com/png/Flag/Rounded%20World%20Flags/Indonesia%20Flag.png",
            "title": "Red Bird"
        },
        {
            "title": "Purple Cat",
            "description": "Why are we teaching kids there are purple cats?"
        },
        {
            "image": "https://lh3.googleusercontent.com/UMB2HRRRAAzXAEaCM9Gg-baCaDx_1RTXHscW5k2Ge3P4KP4mwTt2m6oyEHBWex3c4SxU=w300",
            "title": "Blue Horse",
            "description": "Your work is going to fill a large part of your life, and the only way to be truly satisfied is to do what you believe is great work. And the only way to do great work is to love what you do. If you haven't found it yet, keep looking. Don't settle. As with all matters of the heart, you'll know when you find it."
        },
        {
            "image": "https://cdn.iconscout.com/public/images/icon/free/png-512/frog-face-animal-aquatic-3272656142b1b3cb-512x512.png",
            "title": "Green Frog",
            "description": "Cortado, cappuccino, espresso."
        },
        {
            "image": "https://marketplace.canva.com/MAB60kWLDdM/1/thumbnail/canva-cute-dog-icon-MAB60kWLDdM.png",
            "title": "White Dog",
        },
        {
            "title": "Yellow Snake",
        },
        {
            "image": "http://icons.iconarchive.com/icons/aha-soft/desktop-halloween/256/Hat-icon.png",
            "title": "Black Witch",
            "description": "Peter piper picked a peck of pickled peppers."
        },
    ];
    public listitems = this.objArray;
    public itemTapped(args) {
        console.dir(args.selectedItem);
        MyModel.set('selection', args.selectedItem);
        if (typeof args.selectedItem == 'string') {
            MyModel.set('selection', args.selectedItem);
        } else {
            MyModel.set('selection', args.selectedItem.title);
        }
        // You can user `https://maps.googleapis.com/maps/api/place/details/json?placeid=${args.selectedItem.place_id}&key=${API_KEY}` for detailed place infos
    }

    cancelFilterableList(args) {
        console.log('the thing was canceled');
        console.dir(args);
    }

    showPicker() {
        this.set('listitems', this.languages);
        (<any>this.page.getViewById('myfilter')).show(frame.topmost());
    }

    showNewThings() {
        this.set('listitems', this.objArray);
        (<any>this.page.getViewById('myfilter')).show(frame.topmost());
    }

    showPickerAsAutocomplete() {
        this.filterableListpicker = (<any>this.page.getViewById('myfilter'));
        this.filterableListpicker.show(frame.topmost());
    
        this.filterableListpicker.autocomplete((data) => {
            let url = `${placesApiUrl}?input=${data.value}&language=fr_FR&key=${API_KEY}`;
            http.getJSON<Predictions>(url).then((res) => {
                //console.dir(res)
                const airportsCollection = res.predictions;
                const items = [];
                for (let i = 0; i < airportsCollection.length; i++) {
                    items.push({
                        title: airportsCollection[i].description,
                        description: "",
                        source: airportsCollection[i]
                    });
                    
                }
                this.set("listitems", items)
            }).catch((err) => {
                const message = 'Error fetching remote data from ' + url + ': ' + err.message;
                console.log(message);
                alert(message);
            });
        });
    }
}

export interface Predictions {
    predictions: PredictionsItems[];
}

export interface PredictionsItems {
    id: string;
    description: string;
    place_id: string;
    reference: string;
    structured_formatting: StructuredFormattingItems[];
    types: itemsType[];
    matched_substrings: MatchedSubstring;
}

export interface StructuredFormattingItems {
    main_text: string;
    main_text_matched_substrings: MatchedSubstring[],
    secondary_text: string;
}

export interface itemsType {
    locality: string;
    political: string[],
    geocode: string;
}

export interface MatchedSubstring {
    length: number;
    offset: number;
}