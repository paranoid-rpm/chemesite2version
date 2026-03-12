import { useState } from 'react'

const TOPICS = [
  {
    id: 'atom',
    index: '01',
    title: 'Atomic Structure',
    sections: [
      {
        heading: 'The Nucleus',
        body: 'The atom consists of a dense nucleus containing protons and neutrons, surrounded by electrons occupying discrete energy levels (shells). The number of protons defines the atomic number Z, which uniquely identifies the element. The mass number A equals the total number of protons and neutrons (nucleons).'
      },
      {
        heading: 'Electron Configuration',
        body: 'Electrons fill orbitals according to three principles: the Aufbau principle (fill lowest energy first), the Pauli exclusion principle (no two electrons share identical quantum numbers), and Hund\u2019s rule (maximize unpaired electrons within a subshell). Subshell order: 1s 2s 2p 3s 3p 4s 3d 4p...'
      },
      {
        heading: 'Quantum Numbers',
        body: 'Each electron is described by four quantum numbers: n (principal \u2014 shell size), l (angular momentum \u2014 subshell shape: s=0, p=1, d=2, f=3), m\u2097 (magnetic \u2014 orbital orientation), and m\u209b (spin: +1/2 or \u22121/2). The Pauli exclusion principle states no two electrons in the same atom can have identical sets of all four quantum numbers.'
      },
      {
        heading: 'Isotopes and Mass',
        body: 'Isotopes are atoms of the same element with different neutron counts. The atomic mass shown in the periodic table is the weighted average of all naturally occurring isotopes. Example: chlorine has two isotopes, \u00b3\u2075Cl (75.77%) and \u00b3\u2077Cl (24.23%), giving an average mass of 35.45 u.'
      },
    ]
  },
  {
    id: 'periodic',
    index: '02',
    title: 'Periodic Law',
    sections: [
      {
        heading: 'Mendeleev\u2019s Law',
        body: 'The physical and chemical properties of elements are a periodic function of their atomic number. Elements are arranged in order of increasing Z. Horizontal rows are called periods (7 total); vertical columns are groups (18 total). Elements in the same group have similar valence electron configurations and chemical behavior.'
      },
      {
        heading: 'Periodic Trends',
        body: 'Atomic radius decreases across a period (more protons attract electrons inward) and increases down a group (additional electron shells). Ionization energy increases across a period and decreases down a group. Electronegativity (Pauling scale) is highest for fluorine (3.98) and generally increases toward the top-right of the table.'
      },
      {
        heading: 'Electronegativity & Bond Type',
        body: '\u0394EN < 0.5: nonpolar covalent. 0.5 \u2264 \u0394EN < 1.7: polar covalent. \u0394EN \u2265 1.7: ionic. Metallic bonds occur in metals where valence electrons form a delocalized \u201celectron sea.\u201d Electronegativity values: F=3.98, O=3.44, N=3.04, Cl=3.16, C=2.55, H=2.20, Na=0.93.'
      },
    ]
  },
  {
    id: 'bond',
    index: '03',
    title: 'Chemical Bonding',
    sections: [
      {
        heading: 'Covalent Bond',
        body: 'Formed by sharing electron pairs between nonmetal atoms. A single bond shares 2 electrons (bond order 1), double bond shares 4 (bond order 2), triple bond shares 6 (bond order 3). Higher bond order = shorter bond length and greater bond energy. Example: N\u2082 has a triple bond (bond energy 945 kJ/mol).'
      },
      {
        heading: 'Ionic Bond',
        body: 'Formed by electrostatic attraction between oppositely charged ions. Occurs when \u0394EN \u2265 1.7. Metals lose electrons to form cations (Na\u207a, Ca\u00b2\u207a); nonmetals gain electrons to form anions (Cl\u207b, O\u00b2\u207b). Ionic compounds form crystal lattices with high melting points and conduct electricity when dissolved.'
      },
      {
        heading: 'Metallic Bond',
        body: 'Metal atoms release valence electrons into a delocalized \u201celectron sea\u201d that surrounds the positive metal ion cores. This explains the high electrical conductivity, thermal conductivity, ductility, and malleability of metals. Alloys modify these properties by introducing other elements.'
      },
      {
        heading: 'Intermolecular Forces',
        body: 'Hydrogen bonding (N\u2013H\u00b7\u00b7\u00b7O, O\u2013H\u00b7\u00b7\u00b7N etc.) is the strongest intermolecular force (up to 40 kJ/mol). Dipole-dipole forces act between polar molecules. London dispersion forces (van der Waals) affect all molecules and increase with molar mass. These forces determine boiling points, solubility, and viscosity.'
      },
    ]
  },
  {
    id: 'classes',
    index: '04',
    title: 'Substance Classes',
    sections: [
      {
        heading: 'Oxides',
        body: 'Binary compounds of oxygen with another element. Basic oxides (metal oxides): react with water \u2192 base, react with acid \u2192 salt+water. Example: Na\u2082O + H\u2082O \u2192 2NaOH. Acidic oxides (nonmetal oxides): react with water \u2192 acid. Example: SO\u2083 + H\u2082O \u2192 H\u2082SO\u2084. Amphoteric oxides (Al\u2082O\u2083, ZnO) react with both.'
      },
      {
        heading: 'Acids',
        body: 'Arrhenius definition: substances that dissociate in water to release H\u207a ions. Strong acids (HCl, H\u2082SO\u2084, HNO\u2083, HBr, HI, HClO\u2084) fully dissociate. Weak acids (CH\u2083COOH, HF, H\u2082CO\u2083) partially dissociate. The degree of dissociation and Ka value determine acid strength. Polyprotic acids donate multiple protons.'
      },
      {
        heading: 'Bases',
        body: 'Arrhenius definition: substances that dissociate in water to release OH\u207b ions. Strong bases: NaOH, KOH, Ca(OH)\u2082. Weak bases: NH\u2083\u00b7H\u2082O. Br\u00f8nsted-Lowry definition broadens this: a base is any proton acceptor. Lewis definition: a base donates electron pairs. Neutralization: acid + base \u2192 salt + water.'
      },
      {
        heading: 'Salts',
        body: 'Ionic compounds formed by acid-base neutralization. Normal salts: NaCl, Na\u2082SO\u2084. Acid salts (contain H): NaHCO\u2083, NaHSO\u2084. Basic salts (contain OH): Mg(OH)Cl. Solubility rules: all nitrates soluble; chlorides soluble except AgCl, PbCl\u2082, Hg\u2082Cl\u2082; sulfates soluble except BaSO\u2084, PbSO\u2084.'
      },
    ]
  },
  {
    id: 'reactions',
    index: '05',
    title: 'Chemical Reactions',
    sections: [
      {
        heading: 'Reaction Types',
        body: 'Combination: A + B \u2192 AB. Decomposition: AB \u2192 A + B. Single displacement: A + BC \u2192 AC + B (occurs only if A is more active than B). Double displacement (metathesis): AB + CD \u2192 AD + CB. Combustion: fuel + O\u2082 \u2192 CO\u2082 + H\u2082O (\u0394H < 0).'
      },
      {
        heading: 'Thermochemistry',
        body: 'Exothermic reactions release heat (\u0394H < 0), endothermic absorb heat (\u0394H > 0). Hess\u2019s law: the total enthalpy change is independent of the reaction pathway. Standard enthalpy of formation \u0394H\u00b0f is the enthalpy change when 1 mol of compound forms from elements in their standard states. Bond enthalpy method estimates \u0394H from bond breaking (endothermic) and bond forming (exothermic).'
      },
      {
        heading: 'Reaction Rate',
        body: 'Rate depends on: concentration (higher \u2192 faster), temperature (Arrhenius: k = A\u00b7e^(\u2212Ea/RT)), surface area, catalyst. Activation energy Ea is the minimum energy required to start a reaction. A catalyst provides an alternative pathway with lower Ea without being consumed. Rate law: r = k[A]^m[B]^n where m, n are experimentally determined.'
      },
      {
        heading: 'Chemical Equilibrium',
        body: 'At equilibrium, forward and reverse rates are equal. Equilibrium constant Kc = [products]/[reactants] (concentrations at equilibrium). Kc > 1: products favored. Kc < 1: reactants favored. Le Chatelier\u2019s principle: a system at equilibrium shifts to counteract a stress (change in concentration, pressure, or temperature).'
      },
    ]
  },
  {
    id: 'solutions',
    index: '06',
    title: 'Solutions & pH',
    sections: [
      {
        heading: 'Concentration Units',
        body: 'Molarity C = n/V (mol/L). Molality b = n/m\u209b\u2092\u2097\u1d65\u1d49\u207f\u1d57 (mol/kg). Mass fraction \u03c9 = m(solute)/m(solution). Mole fraction \u03c7 = n(component)/n(total). For dilution: C\u2081V\u2081 = C\u2082V\u2082. Ionic strength affects solution behavior through electrostatic interactions.'
      },
      {
        heading: 'The pH Scale',
        body: 'pH = \u2212log[H\u207a]. At 25\u00b0C, Kw = [H\u207a][OH\u207b] = 10\u207b\u00b9\u2074, so pH + pOH = 14. pH < 7: acidic. pH = 7: neutral. pH > 7: basic. Each pH unit represents a 10-fold change in [H\u207a]. Blood pH = 7.35\u20137.45. Gastric acid pH \u2248 1.5\u20133.5. Seawater pH \u2248 8.1.'
      },
      {
        heading: 'Buffers',
        body: 'A buffer resists pH changes when acid or base is added. Composed of a weak acid and its conjugate base (or weak base and conjugate acid). Henderson-Hasselbalch equation: pH = pKa + log([A\u207b]/[HA]). Biological buffers: carbonate (CO\u2082/HCO\u2083\u207b), phosphate (H\u2082PO\u2084\u207b/HPO\u2084\u00b2\u207b), hemoglobin.'
      },
    ]
  },
  {
    id: 'redox',
    index: '07',
    title: 'Redox Reactions',
    sections: [
      {
        heading: 'Oxidation States',
        body: 'Rules for assigning oxidation states: elemental form = 0; monatomic ion = charge; O usually \u22122 (except in peroxides \u22121, F\u2082O +2); H usually +1 (except in metal hydrides \u22121); sum of oxidation states in a neutral molecule = 0. Oxidation = increase in oxidation state (loss of e\u207b). Reduction = decrease (gain of e\u207b). OIL RIG.'
      },
      {
        heading: 'Balancing by Half-Reactions',
        body: 'Separate into oxidation and reduction half-reactions. Balance atoms (O with H\u2082O, H with H\u207a). Balance charges with e\u207b. Multiply to equalize electrons transferred. Add half-reactions. In basic solution: add OH\u207b to neutralize H\u207a. Check: total charge and atoms balanced. Example: MnO\u2084\u207b + Fe\u00b2\u207a \u2192 Mn\u00b2\u207a + Fe\u00b3\u207a (acidic).'
      },
      {
        heading: 'Electrochemistry',
        body: 'Galvanic cells convert chemical energy to electrical energy. Electrolytic cells use electrical energy to drive non-spontaneous reactions. Standard electrode potential E\u00b0: measure of tendency to be reduced vs. SHE. Cell potential E\u00b0cell = E\u00b0cathode \u2212 E\u00b0anode. Nernst equation: E = E\u00b0 \u2212 (RT/nF)\u00b7ln(Q). \u0394G\u00b0 = \u2212nFE\u00b0.'
      },
    ]
  },
  {
    id: 'organic',
    index: '08',
    title: 'Organic Chemistry',
    sections: [
      {
        heading: 'Hydrocarbons',
        body: 'Alkanes CnH2n+2: single bonds only, sp\u00b3 hybridization. Alkenes CnH2n: one double bond, sp\u00b2 hybridization. Alkynes CnH2n\u22122: one triple bond, sp hybridization. Arenes: benzene ring (delocalized \u03c0 electrons). Nomenclature (IUPAC): find longest chain, number from end nearest substituent, name substituents as prefixes.'
      },
      {
        heading: 'Functional Groups',
        body: 'Alcohols (-OH): polar, H-bonding, higher bp. Aldehydes (-CHO) and ketones (C=O): carbonyl group. Carboxylic acids (-COOH): acidic, Ka 10\u207b\u2075. Esters (-COO-): formed from acid + alcohol + H\u207a catalyst. Amines (-NH\u2082): basic, nitrogen lone pair. Amides (-CONH\u2082): stable, form proteins (peptide bonds).'
      },
      {
        heading: 'Reaction Mechanisms',
        body: 'Substitution (SN1/SN2): alkyl halides react with nucleophiles. Addition: alkenes react with H\u2082, HX, X\u2082, H\u2082O. Elimination (E1/E2): forms double bond from alkyl halide + base. Markovnikov\u2019s rule: H adds to the carbon with more H atoms. Oxidation of alcohols: primary \u2192 aldehyde \u2192 carboxylic acid; secondary \u2192 ketone; tertiary \u2192 no reaction.'
      },
    ]
  },
]

export default function Theory() {
  const [active, setActive] = useState(TOPICS[0].id)
  const topic = TOPICS.find(t => t.id === active)

  return (
    <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 1.5rem' }}>
      <div style={{ padding: '48px 0 32px' }} className="fade-up">
        <p className="section-label" style={{ marginBottom: 12 }}>Reference</p>
        <h1 style={{ fontSize: '2rem', letterSpacing: '-0.03em' }}>Theory</h1>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '220px 1fr', gap: '3rem', paddingBottom: '4rem' }}>

        {/* Sidebar TOC */}
        <nav style={{ position: 'sticky', top: 72, height: 'fit-content' }}>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 2 }}>
            {TOPICS.map(t => (
              <li key={t.id}>
                <button
                  onClick={() => setActive(t.id)}
                  style={{
                    width: '100%',
                    textAlign: 'left',
                    padding: '8px 12px',
                    borderRadius: 8,
                    border: 'none',
                    cursor: 'pointer',
                    display: 'flex',
                    gap: 12,
                    alignItems: 'baseline',
                    background: active === t.id ? 'var(--bg2)' : 'transparent',
                    color: active === t.id ? 'var(--text)' : 'var(--text2)',
                    fontWeight: active === t.id ? 600 : 400,
                    fontSize: '0.85rem',
                    transition: 'all 0.15s ease',
                    borderLeft: active === t.id ? '2px solid var(--text)' : '2px solid transparent',
                  }}
                >
                  <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.7rem', color: 'var(--text3)' }}>{t.index}</span>
                  {t.title}
                </button>
              </li>
            ))}
          </ul>
        </nav>

        {/* Content */}
        <div key={active} className="fade-up">
          <div style={{ marginBottom: '2.5rem' }}>
            <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.75rem', color: 'var(--text3)' }}>{topic.index}</span>
            <h2 style={{ fontSize: '1.75rem', marginTop: 6 }}>{topic.title}</h2>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            {topic.sections.map((s, i) => (
              <div key={i} style={{ paddingBottom: '2rem', borderBottom: '1px solid var(--border)' }}>
                <h3 style={{ fontSize: '1rem', fontWeight: 600, marginBottom: '0.75rem', color: 'var(--text)' }}>{s.heading}</h3>
                <p style={{ color: 'var(--text2)', lineHeight: 1.75, fontSize: '0.925rem' }}>{s.body}</p>
                {s.formula && (
                  <div style={{
                    marginTop: '1rem',
                    padding: '0.75rem 1.25rem',
                    background: 'var(--bg2)',
                    borderLeft: '3px solid var(--text)',
                    borderRadius: '0 8px 8px 0',
                    fontFamily: 'JetBrains Mono, monospace',
                    fontSize: '0.9rem',
                  }}>
                    {s.formula}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Navigation between topics */}
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '2rem', paddingTop: '2rem', borderTop: '1px solid var(--border)' }}>
            {TOPICS.findIndex(t => t.id === active) > 0 ? (
              <button
                className="btn"
                onClick={() => setActive(TOPICS[TOPICS.findIndex(t => t.id === active) - 1].id)}
              >
                &larr; {TOPICS[TOPICS.findIndex(t => t.id === active) - 1].title}
              </button>
            ) : <span />}
            {TOPICS.findIndex(t => t.id === active) < TOPICS.length - 1 && (
              <button
                className="btn btn-primary"
                onClick={() => setActive(TOPICS[TOPICS.findIndex(t => t.id === active) + 1].id)}
              >
                {TOPICS[TOPICS.findIndex(t => t.id === active) + 1].title} &rarr;
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
