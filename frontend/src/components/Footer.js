function Footer() {
    const now = new Date();
    return (
        <footer className="footer">
            <p className="footer__copyright">&copy; {now.getFullYear()} Mesto Russia</p>
        </footer>
    );
}

export default Footer;