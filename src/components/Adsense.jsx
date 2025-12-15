import { useEffect } from "react";
import PropTypes from "prop-types";

export default function AdSense({
  adSlot,
  adFormat = "auto",
  fullWidthResponsive = true,
  style = {},
}) {
  useEffect(() => {
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (error) {
      console.error("AdSense error:", error);
    }
  }, [adSlot]);

  return (
    <div className="my-6 sm:my-8">
      <ins
        className="adsbygoogle"
        style={{
          display: "block",
          ...style,
        }}
        data-ad-client="ca-pub-6973856939580853"
        data-ad-slot={adSlot}
        data-ad-format={adFormat}
        data-full-width-responsive={fullWidthResponsive ? "true" : "false"}
      />
    </div>
  );
}

AdSense.propTypes = {
  adSlot: PropTypes.string.isRequired,
  adFormat: PropTypes.string,
  fullWidthResponsive: PropTypes.bool,
  style: PropTypes.object,
};
