import style from './Footer.module.css'

type ContactLink = {
    label: string;
    href: string;
    icon: string;
};

const contacts: ContactLink[] = [
    {
        label: 'Telegram',
        href: 'https://t.me/@SanyaStOskol',
        icon: '✈️',
    },
    {
        label: 'GitHub',
        href: 'https://github.com/SanyaSkl',
        icon: '🗃️',
    },
    {
        label: 'LinkedIn',
        href: 'https://linkedin.com/in/alexandr-sklyarenko-0b41793bb',
        icon: '💼',
    },
    {
        label: 'Call Me',
        href: 'tel:+79803215541',
        icon: '📞',
    },
];

export const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className={style.footer}>
            <div className={style.inner}>
                <p className={style.copyright}>
                    © {currentYear} TMDB Search. All rights reserved.
                </p>

                <ul className={style.links}>
                    {contacts.map(({label, href, icon}) => (
                        <li key={href}>
                            <a
                                href={href}
                                target={href.startsWith('tel:') ? undefined : '_blank'}
                                rel={href.startsWith('tel:') ? undefined : 'opener referrer'}
                                className={style.link}
                                aria-label={label}
                            >
                                <span className={style.icon} aria-hidden="true">
                                    {icon}
                                </span>
                                <span className={style.label}>{label}</span>
                            </a>
                        </li>
                    ))}
                </ul>
            </div>
        </footer>
    );
};
