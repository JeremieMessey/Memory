<section id="accueil">
    <article>
        <p>Le principe est simple trouver toutes les paires de cartes correspondantes dans un temps imparti de 3 minutes.</p>
        <p>Etes vous prêt à vous lancer et tenter de battre le record ?</p>

        <a href="?op=game">Lancer une partie</a>
        <table id="scores">
            <thead>
                <tr>
                    <th colspan="2">TOP 10</th>
                </tr>
            </thead>
            <tbody>
            <tr>
                <th>Date</th>
                <th>Temps</th>
            </tr>
            <?php foreach ($scores as $score): ?>
                <tr align="center">
                <?php if( $score['ip'] == $_SERVER['REMOTE_ADDR']) : ?>
                    
                        <?= "<td class='or'>$score[date]</td><td class='or'>$score[temps]</td>"; ?>
                <?php else : ?>
                         <?= "<td>$score[date]</td><td>$score[temps]</td>"; ?>
                <?php endif; ?>
                </tr>
            <?php endforeach; ?>
            </tbody>
        </table>
        <p class='infoScore'>Vos scores sont indiqués en jaune.</p>
    </article>
</section>
