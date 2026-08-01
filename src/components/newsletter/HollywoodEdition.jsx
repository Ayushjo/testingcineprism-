const HollywoodEdition = () => (
  <div>
    {/* MASTHEAD */}
    <div className="nl-mast">
      <div className="nl-mast-row">
        <span className="nl-issue">Issue No. 01 · May 2026</span>
        <span className="nl-badge nl-badge-hw">Hollywood Edition</span>
      </div>
      <div className="nl-brand">The<span className="b">Cine</span>Prism</div>
      <div className="nl-tagline">Cinema through a sharper lens</div>
      <div className="nl-rule nl-rule-hw" />
      <p className="nl-intro">The weekly dispatch for people who actually think about global cinema — not just consume it. Box office, Cannes, the industry behind the curtain, and one scene that deserves more attention than it got.</p>
    </div>

    {/* H1: INDUSTRY STORY */}
    <div className="nl-sec">
      <div className="nl-slabel nl-slabel-hw">01 — The Industry Story</div>
      <h1 className="nl-bigtitle">The Paramount–Warner merger is the most frightening thing happening in Hollywood. Most people are too afraid to say so.</h1>
      <p className="nl-deck">$110 billion. Two studios. One chilling effect already in motion.</p>
      <div className="nl-rule nl-rule-hw" />
      <p className="nl-body">In February 2026, Paramount Skydance announced a $110 billion acquisition of Warner Bros. Discovery. Shareholders approved it in April. The deal closes by Q3. If it does, Hollywood's Big Five becomes a Big Four — and one of those four controls DC, Harry Potter, Game of Thrones, Top Gun, The Godfather, Yellowstone, and HBO simultaneously.</p>
      <p className="nl-body">What makes this truly alarming isn't the antitrust math (roughly 23% market share — uncomfortable but not technically monopolistic). It's what Mark Ruffalo exposed in a New York Times op-ed: many Hollywood actors and directors who privately oppose the deal refused to sign the open letter against it. Not because they disagreed. Because they were afraid of being blacklisted by the studio that would control half of their future work. The merger's most chilling effect is already in force before it has closed.</p>
      <div className="nl-pq nl-pq-hw">"This merger will cause many harms in Hollywood, but one is already in effect: People are afraid to say what they think about their own industry." — Mark Ruffalo &amp; Matt Stoller, NYT</div>
      <p className="nl-body">For films specifically: expect tentpole consolidation, fewer mid-budget originals, and a streaming war that shifts from "who has the most content" to "who has the most inescapable IP." Harry Potter, DC, GOT, Paramount's classics — that's what Ellison is actually buying. Whether it produces better storytelling is a different question. Historical evidence says no.</p>
    </div>

    {/* H2: CANNES RADAR */}
    <div className="nl-sec">
      <div className="nl-slabel nl-slabel-hw">02 — Festival Circuit Radar</div>
      <div className="nl-pgrid nl-g1">
        <div className="nl-pwrap nl-mid">
          <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/4b/Cannes_Palais_des_Festivals_%286100261371%29.jpg/800px-Cannes_Palais_des_Festivals_%286100261371%29.jpg" alt="Cannes" style={{objectPosition:'center'}} />
          <div className="nl-pcap">Cannes Film Festival 2026<small>79th Edition · May 12–24</small></div>
        </div>
      </div>
      <p className="nl-deck" style={{marginBottom:'18px'}}>The 79th Cannes starts May 12. Here's what you actually need to know before everyone starts pretending they've seen things.</p>
      <p className="nl-body">This year's lineup is a deliberate rebuke to the Hollywood-at-Cannes trend. For the first time in recent memory, no American studio brought a film in competition. The Croisette belongs to the auteurs — and the slate is genuinely exceptional for it.</p>
      <p className="nl-body"><strong style={{color:'var(--cream)',fontWeight:'500'}}>Ryusuke Hamaguchi's All of a Sudden</strong> is the immediate Palme d'Or frontrunner. His first film shot outside Japan, in French, starring Virginie Efira. After Drive My Car's Oscar win, every Hamaguchi film is an event.</p>
      <p className="nl-body"><strong style={{color:'var(--cream)',fontWeight:'500'}}>Na Hong-jin's Hope</strong> is the wildcard. His first film since The Wailing — a decade ago. Michael Fassbender and Alicia Vikander. Na is one of the most singular thriller directors alive and the decade-long wait has made this the most anticipated film going in completely blind.</p>
      <p className="nl-body"><strong style={{color:'var(--cream)',fontWeight:'500'}}>Asghar Farhadi's Parallel Tales</strong> with Isabelle Huppert, Catherine Deneuve, and Vincent Cassel — an almost absurd cast. Pedro Almodóvar's Bitter Christmas marks his seventh Cannes Competition appearance, still chasing the Palme he's never won. And James Gray's Paper Tiger (Scarlett Johansson, Adam Driver, Miles Teller) was added late — Frémaux compared it to Gray's debut Little Odessa.</p>
    </div>

    {/* H3: NEW RELEASE VERDICTS */}
    <div className="nl-sec">
      <div className="nl-slabel nl-slabel-hw">03 — New Release Verdicts</div>
      <div className="nl-pgrid nl-g3" style={{marginBottom:'20px'}}>
        <div className="nl-pwrap nl-tall">
          <img src="https://upload.wikimedia.org/wikipedia/en/thumb/8/8a/The_Devil_Wears_Prada_2_poster.jpg/400px-The_Devil_Wears_Prada_2_poster.jpg"
               onError={(e)=>{e.target.src='https://upload.wikimedia.org/wikipedia/commons/thumb/2/28/Anne_Hathaway_at_the_2019_Met_Gala_%28cropped%29.jpg/400px-Anne_Hathaway_at_the_2019_Met_Gala_%28cropped%29.jpg'}}
               alt="Devil Wears Prada 2" />
          <div className="nl-pcap">The Devil Wears Prada 2<small>B+</small></div>
        </div>
        <div className="nl-pwrap nl-tall">
          <img src="https://upload.wikimedia.org/wikipedia/en/thumb/d/d5/Mortal_Kombat_II_film_poster.jpg/400px-Mortal_Kombat_II_film_poster.jpg"
               onError={(e)=>{e.target.src='https://upload.wikimedia.org/wikipedia/commons/thumb/0/0e/Mortal_Kombat_logo.svg/400px-Mortal_Kombat_logo.svg.png'}}
               alt="Mortal Kombat II" />
          <div className="nl-pcap">Mortal Kombat II<small>C+</small></div>
        </div>
        <div className="nl-pwrap nl-tall">
          <img src="https://upload.wikimedia.org/wikipedia/en/thumb/2/2b/Remarkably_Bright_Creatures_film.jpg/400px-Remarkably_Bright_Creatures_film.jpg"
               onError={(e)=>{e.target.src='https://upload.wikimedia.org/wikipedia/commons/thumb/e/e9/Sally_Field_at_2012_San_Diego_Comic_Con_%28cropped%29.jpg/400px-Sally_Field_at_2012_San_Diego_Comic_Con_%28cropped%29.jpg'}}
               alt="Remarkably Bright Creatures" />
          <div className="nl-pcap">Remarkably Bright Creatures<small>A−</small></div>
        </div>
      </div>
      <div className="nl-rev">
        <div className="nl-rev-inner">
          <div className="nl-rev-body">
            <div className="nl-rev-title">The Devil Wears Prada 2</div>
            <div className="nl-rev-meta">Dir. David Frankel · 20th Century Studios · $433M Worldwide</div>
            <p className="nl-rev-text">Twenty years later, Miranda Priestly is still the sharpest thing in any room. Andy Sachs — now a respected journalist — gets fired by text and rehired at Runway without Miranda's consent. Two hours of deeply satisfying professional warfare. Meryl Streep is operating at a level that barely qualifies as performance; it's possession. Emily Blunt gets the funniest writing. Hathaway anchors it with earned exhaustion. A sequel that respects what made the original work instead of explaining it to death.</p>
          </div>
          <div className="nl-rev-score"><span className="nl-rsn">B+</span><span className="nl-rsl">Grade</span></div>
        </div>
      </div>
      <div className="nl-rev">
        <div className="nl-rev-inner">
          <div className="nl-rev-body">
            <div className="nl-rev-title">Mortal Kombat II</div>
            <div className="nl-rev-meta">Dir. Simon McQuoid · New Line Cinema</div>
            <p className="nl-rev-text">More expensive, marginally better, still failing to be the film those trailers promised. The fights are technically impressive. The plot continues to be the franchise's greatest villain. 65% RT and a 'B' CinemaScore are about right. If you loved the first one, this satisfies. If you didn't, nothing here converts you.</p>
          </div>
          <div className="nl-rev-score"><span className="nl-rsn">C+</span><span className="nl-rsl">Grade</span></div>
        </div>
      </div>
      <div className="nl-rev">
        <div className="nl-rev-inner">
          <div className="nl-rev-body">
            <div className="nl-rev-title">Remarkably Bright Creatures</div>
            <div className="nl-rev-meta">Netflix · Limited Release</div>
            <p className="nl-rev-text">Sally Field and Lewis Pullman bond over a cranky octopus in a small film that has no business being this effective. The kind of thing that never gets marketed properly and somehow finds its audience anyway. Exactly what mid-budget original filmmaking looks like when it works. Seek it out.</p>
          </div>
          <div className="nl-rev-score"><span className="nl-rsn">A−</span><span className="nl-rsl">Grade</span></div>
        </div>
      </div>
    </div>

    {/* H4: TV SHOWS */}
    <div className="nl-sec">
      <div className="nl-slabel nl-slabel-hw">04 — What to Watch on TV This Week</div>
      <p className="nl-deck" style={{marginBottom:'22px'}}>Three shows for your queue — one everyone's watching, one dropping this week, one flying completely under the radar.</p>
      <div className="nl-tv">
        <div className="nl-tv-poster">
          <img src="https://upload.wikimedia.org/wikipedia/en/thumb/8/82/Euphoria_season_3_poster.jpg/400px-Euphoria_season_3_poster.jpg"
               onError={(e)=>{e.target.src='https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/Zendaya_2019_%28cropped%29.jpg/400px-Zendaya_2019_%28cropped%29.jpg'}}
               alt="Euphoria S3" />
        </div>
        <div className="nl-tv-body">
          <div>
            <div className="nl-tv-title">Euphoria — Season 3</div>
            <div className="nl-tv-meta">HBO Max · Now Streaming · 8 Episodes</div>
            <p className="nl-tv-text">The final season, four years after Season 2. The characters are now in their mid-20s, and the show is visibly uncertain what it is without the high school framework. The good news: Zendaya is still extraordinary — Rue now a drug mule in Mexico, in debt to crime boss Laurie — and the season opens with genuine noir momentum. The bad news: most supporting characters are spinning their wheels, and Levinson's provocations feel past their sell-by date. Watch it for Zendaya. Accept the unevenness. This show defined a generation's aesthetic vocabulary; the finale deserves your time.</p>
          </div>
          <span className="nl-tv-plat">HBO Max — Streaming Now</span>
        </div>
      </div>
      <div className="nl-tv">
        <div className="nl-tv-poster">
          <img src="https://upload.wikimedia.org/wikipedia/en/thumb/3/32/Spider-Noir_TV_series.jpg/400px-Spider-Noir_TV_series.jpg"
               onError={(e)=>{e.target.src='https://upload.wikimedia.org/wikipedia/commons/thumb/b/b9/Nicolas_Cage_Cannes_2023.jpg/400px-Nicolas_Cage_Cannes_2023.jpg'}}
               alt="Spider-Noir" />
        </div>
        <div className="nl-tv-body">
          <div>
            <div className="nl-tv-title">Spider-Noir</div>
            <div className="nl-tv-meta">Prime Video · May 27, 2026 · 8 Episodes</div>
            <p className="nl-tv-text">Nicolas Cage as a Depression-era Spider-Man detective in 1930s New York — dropping in full on May 27. Directed by Harry Bradbeer (Fleabag), produced by Phil Lord and Christopher Miller. Genius gimmick: released in both black-and-white AND full Technicolor as two completely different viewing experiences. The tagline alone earns its place: "With no power comes no responsibility." Watch the B&W version first.</p>
          </div>
          <span className="nl-tv-plat nl-tv-plat-b">Prime Video — May 27</span>
        </div>
      </div>
      <div className="nl-tv">
        <div className="nl-tv-poster">
          <img src="https://upload.wikimedia.org/wikipedia/en/thumb/4/4b/Industry_Season_3_poster.jpg/400px-Industry_Season_3_poster.jpg"
               onError={(e)=>{e.target.src='https://upload.wikimedia.org/wikipedia/en/thumb/1/18/Industry_TV_poster.jpg/400px-Industry_TV_poster.jpg'}}
               alt="Industry S3" />
        </div>
        <div className="nl-tv-body">
          <div>
            <div className="nl-tv-title">Industry — Season 3</div>
            <div className="nl-tv-meta">HBO Max · Streaming Now · 2026</div>
            <p className="nl-tv-text">If you're not watching Industry, you're missing the sharpest show about power, ambition, and what late capitalism does to young people that television is currently producing. Season 3 returned in early 2026 and continued its run as the smartest drama on HBO. Set in a London investment bank, it makes finance feel like a blood sport. The performances — particularly Myha'la and Harry Lawtey — are extraordinary. This is the show that Succession fans moved to when Succession ended. Consider this your notice.</p>
          </div>
          <span className="nl-tv-plat">HBO Max — Streaming Now</span>
        </div>
      </div>
    </div>

    {/* H5: STREAMING PICK */}
    <div className="nl-sec">
      <div className="nl-slabel nl-slabel-hw">05 — The Streaming Pick</div>
      <div className="nl-ott">
        <div className="nl-ott-inner">
          <div className="nl-ott-body">
            <div className="nl-ott-title">Project Hail Mary</div>
            <div className="nl-ott-meta">2026 · Sci-Fi · Amazon Prime Video · $318M+ Domestic</div>
            <p className="nl-ott-text">Still technically in theatres. But if you missed it, it's arriving on streaming and demands to be the first thing you watch. Ryan Gosling, alone in space, slowly remembering why he's there. An alien that communicates through music. The most earnest film made in years — not ironic, not self-aware, just genuinely, uncynically magnificent. Directed by Phil Lord and Christopher Miller, who are apparently incapable of making a bad film. The algorithm will not put this in front of you. It will show you the ninth Marvel sequel instead. Override it.</p>
          </div>
          <div className="nl-rbox"><span className="nl-rn nl-rn-b">★★★★★</span><span className="nl-rl">Essential</span></div>
        </div>
      </div>
    </div>

    {/* H6: DIRECTOR'S CHAIR */}
    <div className="nl-sec">
      <div className="nl-slabel nl-slabel-hw">06 — Director's Chair</div>
      <p className="nl-deck">This week: Ryusuke Hamaguchi — going into Cannes as the frontrunner.</p>
      <div className="nl-dir-card">
        <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/94/Hamaguchi_Ryusuke.jpg/800px-Hamaguchi_Ryusuke.jpg"
             onError={(e)=>{e.target.src='https://upload.wikimedia.org/wikipedia/commons/thumb/e/e9/Drive_My_Car_film.jpg/800px-Drive_My_Car_film.jpg'}}
             className="nl-dir-img" alt="Ryusuke Hamaguchi" />
        <div className="nl-dir-body">
          <div className="nl-dir-name">Ryusuke Hamaguchi</div>
          <div className="nl-dir-sub">Japanese Cinema · b. 1978 · Drive My Car · Cannes Competition 2026</div>
          <p className="nl-body">There is a specific Hamaguchi shot you learn to recognise: a character in the middle of a long, unbroken take, speaking — not about what they claim to be speaking about, but about something they cannot quite say out loud. The camera stays. The light is flat. And slowly, in the space between the words and what the words cost them, something devastating happens.</p>
          <p className="nl-body">He became globally known with Drive My Car (2021), a three-hour Murakami adaptation that won the Oscar for Best International Feature and is now among the great films of the decade. His earlier Wheel of Fortune and Fantasy — three separate short stories about women navigating the distance between what they feel and what the world allows them to say — is possibly even better. It has no Oscar and almost no visibility. It should be on every list.</p>
          <p className="nl-body">Going into Cannes with his first non-Japanese-language film, shot in French, is either the boldest move of his career or the natural next step of a filmmaker who has outgrown any national boundary. Either reading is exciting.</p>
        </div>
      </div>
    </div>

    {/* H7: SCENE BREAKDOWN */}
    <div className="nl-sec">
      <div className="nl-slabel nl-slabel-hw">07 — The Scene Breakdown</div>
      <span className="nl-stag">Close Reading</span>
      <div className="nl-stitle">The car confession scene</div>
      <div className="nl-sfilm">Drive My Car (2021) · Dir. Ryusuke Hamaguchi</div>
      <div className="nl-pgrid nl-g1" style={{marginBottom:'18px'}}>
        <div className="nl-pwrap nl-short">
          <img src="https://upload.wikimedia.org/wikipedia/en/thumb/7/7e/Drive_My_Car_film.jpg/800px-Drive_My_Car_film.jpg"
               onError={(e)=>{e.target.src='https://upload.wikimedia.org/wikipedia/commons/thumb/4/4b/Cannes_Palais_des_Festivals_%286100261371%29.jpg/800px-Cannes_Palais_des_Festivals_%286100261371%29.jpg'}}
               alt="Drive My Car" style={{objectPosition:'center'}} />
          <div className="nl-pcap">Drive My Car<small>Dir. Ryusuke Hamaguchi · 2021 · Oscar: Best International Feature</small></div>
        </div>
      </div>
      <div className="nl-sbreakdown">
        <div className="nl-sel"><span className="nl-selabel nl-selabel-hw">Frame</span><span className="nl-setext">The Saab's interior becomes the entire world. No establishing shot. Hamaguchi traps both characters — and the audience — inside the confession.</span></div>
        <div className="nl-sel"><span className="nl-selabel nl-selabel-hw">Duration</span><span className="nl-setext">Twelve minutes, unbroken. Most directors cut for coverage. Hamaguchi knows accumulation of time is what makes the confession cost something.</span></div>
        <div className="nl-sel"><span className="nl-selabel nl-selabel-hw">Performance</span><span className="nl-setext">Nishijima doesn't look at Misaki while speaking. His eyes stay on the middle distance. He's talking to himself as much as her.</span></div>
        <div className="nl-sel"><span className="nl-selabel nl-selabel-hw">What it does</span><span className="nl-setext">Recontextualizes the entire first act. Every scene before this was Yusuke performing composure. This is him stopping.</span></div>
      </div>
      <p className="nl-body">What makes great Hamaguchi scenes work is the same thing that makes great plays work: the irreversibility of the spoken word. Once Yusuke says this, the film can never go back. Neither can he. The car interior — that sealed, moving, intimate space — is the perfect chamber for a confession that has been waiting years to be made.</p>
    </div>

    {/* H8: THE NUMBER */}
    <div className="nl-sec">
      <div className="nl-slabel nl-slabel-hw">08 — The Number That Matters</div>
      <span className="nl-bignum nl-bignum-hw">$77M</span>
      <p className="nl-bignum-ctx">The Devil Wears Prada 2's opening weekend. The most important box office number of 2026 — and not for the reason you think.</p>
      <p className="nl-body">Not because of the size. Because of what drove it. Women accounted for 76% of opening weekend ticket buyers — one of the most gender-skewed openings in recent memory. The industry has spent a decade convinced that female-skewing films can't open big on their first summer weekend. That belief has just been statistically demolished.</p>
      <p className="nl-body">The deeper read: this may also be the last great victory of millennial nostalgia as a theatrical force. The original aired endlessly on basic cable through the 2010s — creating slow cultural saturation that streaming algorithms cannot manufacture retroactively. Prada 2 could succeed because the audience had twenty years of quiet rewatches behind them. Hollywood is monetizing a non-renewable resource and calling it a strategy.</p>
    </div>

    {/* H9: HIDDEN GEM */}
    <div className="nl-sec">
      <div className="nl-slabel nl-slabel-hw">09 — Hidden Gem</div>
      <div className="nl-pgrid nl-g1" style={{marginBottom:'18px'}}>
        <div className="nl-pwrap nl-mid">
          <img src="https://upload.wikimedia.org/wikipedia/en/thumb/9/9d/Mommy_2014_film_poster.jpg/800px-Mommy_2014_film_poster.jpg"
               onError={(e)=>{e.target.src='https://upload.wikimedia.org/wikipedia/commons/thumb/f/f2/AFI_Fest_2014_Presented_By_Audi_-_%22Mommy%22_Special_Screening_-_Arrivals_-_Xavier_Dolan_%2815148427312%29.jpg/600px-AFI_Fest_2014_Presented_By_Audi_-_%22Mommy%22_Special_Screening_-_Arrivals_-_Xavier_Dolan_%2815148427312%29.jpg'}}
               alt="Mommy 2014" />
          <div className="nl-pcap">Mommy<small>Dir. Xavier Dolan · 2014 · Cannes Jury Prize</small></div>
        </div>
      </div>
      <div className="nl-arch-title">Mommy</div>
      <span className="nl-arch-year nl-arch-year-hw">Xavier Dolan · 2014</span>
      <p className="nl-body">Given that Cannes starts next week, this is the film that answers the question "what is cinema for" most violently and most beautifully. A widowed mother and her ADHD-afflicted teenage son in suburban Quebec, shot in a 1:1 aspect ratio — a perfect square — that expands into widescreen exactly once, at the moment of pure unbounded hope. That expansion is one of the three or four most physically overwhelming moments in modern cinema. You feel it in your chest.</p>
      <p className="nl-body">Dolan was 25. It tied for the Jury Prize at Cannes alongside Godard's farewell film. Watch it before the Cannes coverage fills your feed this week.</p>
      <div className="nl-wtw" style={{borderColor:'var(--blue-d)'}}>📺 &nbsp;<strong style={{color:'var(--cream)'}}>Where to Watch:</strong>&nbsp; MUBI · Apple TV (rental)</div>
    </div>

    {/* H10: TRIVIA */}
    <div className="nl-sec">
      <div className="nl-slabel nl-slabel-hw">10 — Cinephile Trivia</div>
      <div className="nl-trivia">
        <div className="nl-trivia-head">This Week's Deep Cut</div>
        <p className="nl-body">The 1:1 aspect ratio in Mommy wasn't decided in pre-production. Dolan shot test scenes in the square format and sent them to Cannes selection committee member Frédéric Bonnaud. Bonnaud's response: "intriguing but not finished." Dolan committed to it for the entire film specifically because of that pushback.</p>
        <p className="nl-body" style={{marginTop:'11px'}}>The aspect ratio becoming the film's central formal argument — the square as constraint, as the shape of a life that has been compressed into survival, exploding outward at the one moment of imagined freedom — was born from a note that told him it wasn't working. Some films are made by yes. Some are made by no. Mommy is made by no.</p>
      </div>
    </div>

    {/* FOOTER */}
    <div className="nl-footer">
      <div className="nl-footer-row">
        <div className="nl-footer-brand">The<em>Cine</em>Prism</div>
        <ul className="nl-footer-links">
          <li><a href="https://thecineprism.com">Website</a></li>
          <li><a href="https://twitter.com/TheCineprism">@TheCineprism</a></li>
        </ul>
      </div>
      <p className="nl-footer-fine">© 2026 TheCinePrism · Hollywood Edition · Issue No. 01 · Written with opinion, not with PR notes.</p>
    </div>
  </div>
);

export default HollywoodEdition;
