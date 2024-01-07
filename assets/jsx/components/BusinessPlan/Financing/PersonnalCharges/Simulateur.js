import React, { useState, useEffect } from "react";
import Spinner from "react-bootstrap/Spinner";

const Simulateur = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const delay = setTimeout(() => {
      setIsLoading(false);
    }, 6000);

    return () => clearTimeout(delay);
  }, []);

  return (
    <div>
      {isLoading ? (
        <div className="text-center">
          <Spinner animation="border" variant="primary" />
        </div>
      ) : (
        <iframe
          id="simulateurEmbauche"
          src="https://mon-entreprise.urssaf.fr/iframes/simulateur-embauche?integratorUrl=http%253A%252F%252F127.0.0.1%253A8000%252Fcharges-personnel&lang=fr&couleur=%255B271%252C91%252C27%255D"
          style={{
            border: "none",
            width: "100%",
            display: "block",
            overflowY: "scroll",
            height: 700,
          }}
          allow="clipboard-write"
          allowFullScreen="true"
          webkitallowfullscreen="true"
          mozallowfullscreen="true"
          title="Simulateur de revenus pour salarié"
        />
      )}
    </div>
  );
};

export default Simulateur;
