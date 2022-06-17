import { PropsWithoutRef, SVGAttributes } from 'react';

export type SvgProps = PropsWithoutRef<Omit<SVGAttributes<SVGSVGElement>, 'xmlns' | 'viewport'>>;
