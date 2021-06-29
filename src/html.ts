import { css_color_name_table, isCssColorName } from "./css_named_colors";

/* 0 ～ 1 */
export type rgb_t = {
  r: number;
  g: number;
  b: number;
  a?: number;
};

export function selectBlackOrWhiteInBgColor(rgb: rgb_t) {
  const sRGBToRGBElement = (v: number) =>
    v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
  const R = sRGBToRGBElement(rgb.r);
  const G = sRGBToRGBElement(rgb.g);
  const B = sRGBToRGBElement(rgb.b);
  /* 背景の輝度 */
  const Luminance = 0.2126 * R + 0.7152 * G + 0.0722 * B;

  /* 白と黒との輝度の差を算出 */
  const DiffWhite = 1.0 - Luminance;
  const DiffBlack = Luminance;

  /* 輝度差が高いものを採用 */
  return DiffWhite > DiffBlack ? "white" : "black";
}

export function cssRgbToRgb(s: string): rgb_t | undefined {
  if (isCssColorName(s)) {
    return cssRgbToRgb(css_color_name_table[s]);
  }

  /**
   *
   * 16進表記: #RRGGBB[AA]
   *    R (赤)、 G (緑)、 B (青) と A (アルファ) は16進数の文字 (0–9, A–F) です。
   *    A は任意です。例えば、 #ff0000 は #ff0000ff と同等です。
   *
   * 16進表記: #RGB[A]
   *    R (赤)、 G (緑)、 B (青) と A (アルファ) は16進数の文字 (0–9, A–F) です。
   *    A は任意です。3桁表記 (#RGB) は6桁形式 (#RRGGBB) を短縮したものです。
   *    例えば、 #f09 は #ff0099 と同じ色です。
   *    同様に、4桁の RGB 表記 (#RGBA) は8桁形式 (#RRGGBBAA) を短縮したものです。
   *    例えば、 #0f38 は #00ff3388 と同じ色です。
   *
   */
  {
    const m = s.match(/^#([0-9a-f]{2})([0-9a-f]{2})([0-9a-f]{2})$/i);
    if (m) {
      return {
        r: parseInt(m[1], 16) / 255,
        g: parseInt(m[2], 16) / 255,
        b: parseInt(m[3], 16) / 255
      };
    }
  }
  {
    const m = s.match(
      /^#([0-9a-f]{2})([0-9a-f]{2})([0-9a-f]{2})([0-9a-f]{2})$/i
    );
    if (m) {
      return {
        r: parseInt(m[1], 16) / 255,
        g: parseInt(m[2], 16) / 255,
        b: parseInt(m[3], 16) / 255,
        a: parseInt(m[4], 16) / 255
      };
    }
  }
  {
    const m = s.match(/^#([0-9a-f])([0-9a-f])([0-9a-f])$/i);
    if (m) {
      return {
        r: parseInt(m[1], 16) / 15,
        g: parseInt(m[2], 16) / 15,
        b: parseInt(m[3], 16) / 15
      };
    }
  }
  {
    const m = s.match(/^#([0-9a-f])([0-9a-f])([0-9a-f])$/i);
    if (m) {
      return {
        r: parseInt(m[1], 16) / 15,
        g: parseInt(m[2], 16) / 15,
        b: parseInt(m[3], 16) / 15,
        a: parseInt(m[4], 16) / 15
      };
    }
  }

  /**
   *
   * 関数表記: rgb[a](R, G, B[, A])
   *    R (赤)、 G (緑)、 B (青) は 数値またはパーセント表記のどちらかで、255が100%に対応します。
   *    A (アルファ)は0と1の間の数値、またはパーセント表記で、数値1が100% (不透明) です。
   *
   * 関数表記: rgb[a](R G B[ / A])
   *    CSS Colors Level 4 では、関数表記で空白区切りの値の対応が追加されます。
   *
   */
  const avalue = (astr: string) => {
    if (astr.endsWith("%")) {
      return parseFloat(astr.substr(0, astr.length - 1));
    } else {
      return parseFloat(astr);
    }
  };

  {
    const m = s.match(
      /^rgba\s*\(([0-9\.]+)\s*,*\s*([0-9\.]+)\s*,*\s*([0-9\.]+)\s*,*\s*([0-9\.]+%*)\s*\)$/i
    );
    if (m) {
      return {
        r: parseFloat(m[1]) / 255,
        g: parseFloat(m[2]) / 255,
        b: parseFloat(m[3]) / 255,
        a: avalue(m[4])
      };
    }
  }
  {
    const m = s.match(
      /^rgba\s*\(([0-9\.]+)%\s*,*\s*([0-9\.]+)%\s*,*\s*([0-9\.]+)%\s*,*\s*([0-9\.]+%*)\s*\)$/i
    );
    if (m) {
      return {
        r: parseFloat(m[1]) / 100,
        g: parseFloat(m[2]) / 100,
        b: parseFloat(m[3]) / 100,
        a: avalue(m[4])
      };
    }
  }
  {
    const m = s.match(
      /^rgb\s*\(([0-9\.]+)\s*,*\s*([0-9\.]+)\s*,*\s*([0-9\.]+)\s*\)$/i
    );
    if (m) {
      return {
        r: parseFloat(m[1]) / 255,
        g: parseFloat(m[2]) / 255,
        b: parseFloat(m[3]) / 255
      };
    }
  }
  {
    const m = s.match(
      /^rgb\s*\(([0-9\.]+)%\s*,*\s*([0-9\.]+)%\s*,*\s*([0-9\.]+)%\s*\)$/i
    );
    if (m) {
      return {
        r: parseFloat(m[1]) / 100,
        g: parseFloat(m[2]) / 100,
        b: parseFloat(m[3]) / 100
      };
    }
  }
}

export function rgbToCssRgb(rgb: rgb_t) {
  const hex2 = (v: number | undefined) =>
    v !== undefined ? ("00" + Math.floor(v * 255).toString(16)).slice(-2) : "";
  return "#" + hex2(rgb.r) + hex2(rgb.g) + hex2(rgb.b) + hex2(rgb.a);
}
