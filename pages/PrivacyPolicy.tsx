
import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Shield, Lock, Eye, FileText, Server, UserCheck, Mail } from 'lucide-react';
import { useApp } from '../context/AppContext';
import SEOHead from '../components/SEOHead';

const PrivacyPolicy: React.FC = () => {
    const { t } = useApp();

    const sections = [
        {
            id: 'intro',
            icon: <Shield size={24} className="text-primary" />,
            title: "1. Inleiding",
            content: `
                <p class="mb-4">Bij SKYE (hierna "wij", "ons" of "onze") hechten we veel waarde aan uw privacy. Dit privacybeleid legt uit hoe wij persoonlijke gegevens verzamelen, gebruiken, delen en beschermen wanneer u onze website bezoekt of onze diensten gebruikt.</p>
                <p>Door gebruik te maken van onze diensten, gaat u akkoord met de verzameling en het gebruik van informatie in overeenstemming met dit beleid.</p>
            `
        },
        {
            id: 'collection',
            icon: <FileText size={24} className="text-accent" />,
            title: "2. Welke gegevens we verzamelen",
            content: `
                <p class="mb-4">Wij verzamelen verschillende soorten gegevens voor uiteenlopende doeleinden om onze dienstverlening aan u te leveren en te verbeteren.</p>
                <ul class="list-disc pl-5 space-y-2 mb-4">
                    <li><strong>Persoonlijke identificatiegegevens:</strong> Naam, e-mailadres, telefoonnummer, bedrijfsnaam, adresgegevens.</li>
                    <li><strong>Technische gegevens:</strong> IP-adres, browsertype, versie, bezochte pagina's, tijd en datum van bezoek, en andere diagnostische gegevens.</li>
                    <li><strong>Gebruiksgegevens:</strong> Informatie over hoe u onze website gebruikt, waar u op klikt en hoe lang u op pagina's blijft.</li>
                </ul>
            `
        },
        {
            id: 'usage',
            icon: <UserCheck size={24} className="text-green-500" />,
            title: "3. Hoe we uw gegevens gebruiken",
            content: `
                <p class="mb-4">Uw gegevens worden gebruikt voor specifieke, legitieme doeleinden:</p>
                <ul class="list-disc pl-5 space-y-2">
                    <li>Om onze diensten te leveren en te onderhouden.</li>
                    <li>Om u op de hoogte te stellen van wijzigingen in onze diensten.</li>
                    <li>Om u toe te staan deel te nemen aan interactieve functies van onze diensten.</li>
                    <li>Voor klantenondersteuning en communicatie.</li>
                    <li>Om analyses of waardevolle informatie te verzamelen zodat we onze diensten kunnen verbeteren.</li>
                    <li>Om technische problemen te detecteren, voorkomen en aanpakken.</li>
                </ul>
            `
        },
        {
            id: 'cookies',
            icon: <Eye size={24} className="text-purple-500" />,
            title: "4. Cookies en Tracking",
            content: `
                <p class="mb-4">Wij gebruiken cookies en soortgelijke trackingtechnologieën om de activiteit op onze dienst te volgen en bepaalde informatie te bewaren.</p>
                <p class="mb-4">Cookies zijn bestanden met een kleine hoeveelheid gegevens die een anonieme unieke identificatie kunnen bevatten.</p>
                <h4 class="font-bold mt-4 mb-2">Soorten cookies die we gebruiken:</h4>
                <ul class="list-disc pl-5 space-y-2">
                    <li><strong>Sessiecookies:</strong> Om onze dienst te laten werken.</li>
                    <li><strong>Voorkeurscookies:</strong> Om uw voorkeuren en instellingen te onthouden.</li>
                    <li><strong>Beveiligingscookies:</strong> Voor beveiligingsdoeleinden.</li>
                    <li><strong>Analytics cookies:</strong> Om bezoekersgedrag te analyseren (Google Analytics).</li>
                </ul>
            `
        },
        {
            id: 'sharing',
            icon: <Server size={24} className="text-orange-500" />,
            title: "5. Delen van gegevens",
            content: `
                <p class="mb-4">Wij verkopen uw persoonlijke gegevens <strong>nooit</strong> aan derden.</p>
                <p class="mb-4">Wij kunnen uw gegevens wel delen met:</p>
                <ul class="list-disc pl-5 space-y-2">
                    <li><strong>Dienstverleners:</strong> Externe partijen die diensten namens ons uitvoeren (zoals hosting, betalingsverwerking, analyses). Zij hebben alleen toegang tot de gegevens die nodig zijn voor hun taak.</li>
                    <li><strong>Wettelijke vereisten:</strong> Als wij te goeder trouw van mening zijn dat een dergelijke actie noodzakelijk is om te voldoen aan een wettelijke verplichting.</li>
                </ul>
            `
        },
        {
            id: 'security',
            icon: <Lock size={24} className="text-red-500" />,
            title: "6. Beveiliging van gegevens",
            content: `
                <p class="mb-4">De beveiliging van uw gegevens is belangrijk voor ons, maar onthoud dat geen enkele methode van verzending via internet of methode van elektronische opslag 100% veilig is.</p>
                <p>Wij streven ernaar commercieel aanvaardbare middelen te gebruiken om uw persoonlijke gegevens te beschermen, inclusief SSL-encryptie en beveiligde servers.</p>
            `
        },
        {
            id: 'rights',
            icon: <Shield size={24} className="text-blue-500" />,
            title: "7. Uw Rechten (AVG/GDPR)",
            content: `
                <p class="mb-4">Onder de Algemene Verordening Gegevensbescherming (AVG) heeft u diverse rechten:</p>
                <ul class="list-disc pl-5 space-y-2">
                    <li>Het recht op inzage, update of verwijdering van de informatie die we over u hebben.</li>
                    <li>Het recht op rectificatie.</li>
                    <li>Het recht om bezwaar te maken.</li>
                    <li>Het recht op beperking.</li>
                    <li>Het recht op gegevensoverdraagbaarheid.</li>
                    <li>Het recht om toestemming in te trekken.</li>
                </ul>
            `
        },
        {
            id: 'contact',
            icon: <Mail size={24} className="text-teal-500" />,
            title: "8. Contact",
            content: `
                <p class="mb-4">Als u vragen heeft over dit privacybeleid, kunt u contact met ons opnemen:</p>
                <ul class="list-none space-y-2">
                    <li><strong>E-mail:</strong> info@hope-connects.nl</li>
                    <li><strong>Telefoon:</strong> +31 6 45 99 89 32</li>
                </ul>
            `
        }
    ];

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-darkBg py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
            <SEOHead
                title="Privacy Policy | SKYE"
                description="Ons privacybeleid. Hoe wij omgaan met uw gegevens, cookies en rechten."
            />
            {/* Background elements */}
            <div className="absolute inset-0 bg-grid-pattern opacity-[0.03] pointer-events-none"></div>
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[100px] pointer-events-none"></div>

            <div className="max-w-4xl mx-auto relative z-10">
                <div className="text-center mb-16">
                    <h1 className="font-display font-black text-4xl sm:text-5xl text-navy dark:text-white mb-4">
                        Privacy Policy
                    </h1>
                    <p className="text-slate-600 dark:text-slate-300 text-lg max-w-2xl mx-auto">
                        Transparantie is de basis van vertrouwen. Hier leest u precies wat we doen met uw gegevens.
                    </p>
                    <p className="mt-4 text-sm text-slate-400">
                        Laatst bijgewerkt: 16 december 2025
                    </p>
                </div>

                <div className="space-y-4">
                    {sections.map((section) => (
                        <AccordionItem key={section.id} section={section} />
                    ))}
                </div>

                <div className="mt-12 text-center text-slate-500 text-sm">
                    <p>&copy; 2025 SKYE. Alle rechten voorbehouden.</p>
                </div>
            </div>
        </div>
    );
};

const AccordionItem = ({ section }: { section: any }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="glass-panel rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-lg border border-slate-200 dark:border-white/5">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full px-6 py-5 flex items-center justify-between text-left bg-white/50 dark:bg-white/5 hover:bg-white/80 dark:hover:bg-white/10 transition-colors"
            >
                <div className="flex items-center gap-4">
                    <div className="p-2 rounded-lg bg-slate-100 dark:bg-white/5">
                        {section.icon}
                    </div>
                    <span className="font-display font-bold text-lg text-navy dark:text-white">
                        {section.title}
                    </span>
                </div>
                {isOpen ? (
                    <ChevronUp className="text-slate-400" />
                ) : (
                    <ChevronDown className="text-slate-400" />
                )}
            </button>

            <div
                className={`overflow-hidden transition-all duration-500 ease-in-out ${isOpen ? 'max-h-[1000px] opacity-100' : 'max-h-0 opacity-0'}`}
            >
                <div
                    className="p-6 pt-0 text-slate-600 dark:text-slate-300 leading-relaxed prose dark:prose-invert max-w-none"
                    dangerouslySetInnerHTML={{ __html: section.content }}
                />
            </div>
        </div>
    );
};

export default PrivacyPolicy;
