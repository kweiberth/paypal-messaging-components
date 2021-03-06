export default function insertTermsTable(terms, offer) {
    const genericError =
        '<h3 class="terms__error">Es ist ein Fehler bei der Berechnung Ihres Angebots aufgetreten. Bitte versuchen Sie es später noch einmal.</h3>';
    if (terms.error || terms.default_max_amount === terms.max_amount) {
        return genericError;
    }

    if (+terms.amount < terms.min_amount && terms.type === 'pala') {
        return `<h3 class="terms__error">PayPal Ratenzahlung steht ab einem Bestellwert von ${terms.formattedMinAmount}€ zur Verfügung. Bitte geben Sie einen Betrag von ${terms.formattedMinAmount}€ oder mehr ein.</h3>`;
    }

    if (+terms.amount > terms.max_amount && terms.type === 'pala') {
        return `<h3 class="terms__error">PayPal Ratenzahlung steht bis zu einem Bestellwert von ${terms.formattedMaxAmount}€ zur Verfügung. Bitte geben Sie einen Betrag von ${terms.formattedMaxAmount}€ oder weniger ein.`;
    }

    if (!offer) {
        return genericError;
    }

    return `
        <h3 class="terms__header">${offer.term} monatliche Raten von je €${offer.monthly}</h3>
        <hr />
        <table>
            <tbody>
                <tr>
                    <td>E-Geld Transaktionsbetrag</td>
                    <td>${terms.formattedAmount}€</td>
                </tr>
                <tr>
                    <td>Effektiver Jahreszinssatz</td>
                    <td>${offer.apr}%</td>
                </tr>
                <tr>
                    <td>Fester Sollzinssatz</td>
                    <td>${offer.nominalRate}%</td>
                </tr>
                <tr>
                    <td>Zinsbetrag</td>
                    <td>${offer.totalInterest}€</td>
                </tr>
                <tr>
                    <td><b>Gesamtbetrag</b></td>
                    <td><b>${offer.total}€</b></td>
                </tr>
            </tbody>
        </table>
    `;
}
