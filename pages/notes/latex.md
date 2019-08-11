# LaTeX

## In-text citations — sort chronologically while keeping bibliography alphabetical

```LaTeX
% Source: https://tex.stackexchange.com/questions/244971/biblatex-order-of-entries-in-a-multi-citation
\usepackage[
  backend=biber,
  sorting=ynt, % These two lines sort the in-text citations chronologically.
  sortcites,
]{biblatex}
\addbibresource{*.bib}

% This line has to be right before the beginning of the document.
\assignrefcontextentries[]{*}
\begin{document}
  (…)

  % Here the sorting is changed in the context of the bibliography.
  \begin{refcontext}[sorting=nyt]
    \printbibliography
  \end{refcontext}
\end{document}
```

## In-text citations — setting comma after name in Harvard style [name, year]

```LaTeX
% These commands have to go in the preamble.
\renewcommand*{\nameyeardelim}{\addcomma\space}
\DeclareNameAlias{sortname}{last-first}
```

## In-text citations — adding page numbers to each source

```LaTeX
% Source: https://tex.stackexchange.com/questions/18910/multiple-citations-with-pages-using-biblatex
\autocites[pp.~12--14]{source01}[p.~2]{source02} etc.
```

Bear in mind that it will mess with the automatic chronological ordering, so keep the order accordingly.

## Table of Contents (ToC) — change header

```LaTeX
% Replace 'british' with appropriate language loaded with babel.
\addto\captionsbritish{
  \renewcommand{\contentsname}{Table of Contents}
}
```

## ToC — add Abstract as a section

```LaTeX
\begin{abstract}
  \addcontentsline{toc}{section}{Abstract} % This.
\end{abstract}
```

## Hyperref anchoring Abstract, ToC and Bibliography

```LaTeX
% Source: https://tex.stackexchange.com/questions/25798/how-can-i-add-abstract-and-acknowledgement-pages-into-the-table-of-contents
\phantomsection % This line adds an anchor for Hyperref package. Must be placed right before the begin.
\begin{abstract}

\cleardoublepage % This line, followed by phantom section, fixes a bug for Table of Contents anchor.
\phantomsection
\tableofcontents
  \addcontentsline{toc}{section}{Table of Contents}
\newpage
```

## Minted centre — source code listings centring

_Please note: The frames don’t work with this solution._

```LaTeX
% Source: https://tex.stackexchange.com/a/161128
\usepackage{minted}
\usepackage{xpatch,letltxmacro}
\LetLtxMacro{\cminted}{\minted}
\let\endcminted\endminted
\xpretocmd{\cminted}{\RecustomVerbatimEnvironment{Verbatim}{BVerbatim}{}}{}{}

\begin{listing}[H]
\begin{cminted}{html}
<<< code >>>
\end{cminted}
\caption{Caption.}
\label{lst:listingHandler}
\end{listing}
```

## Line-break — prevent line break

https://tex.stackexchange.com/a/283202

## References

General notes:

- urldate field should be in YYYY-MM-DD format.
- Authors by default are formatted First Initial, Surname.
  If the author's full name (for example, multiple-word
  company name) or parts of the name have to be printed
  in full, double curly braces should be used.
  I.e.: {{Very Long Company Name}}
- For unofficial, miscellaneous sources usually
  fall under the @unpublished entry type.

```LaTeX
% <REFERENCE_ID> := a unique string identifying the citation

@online{<REFERENCE_ID>,
  author = {},
  title = {},
  year = {},
  url = {},
  urldate = {}
}

@book{<REFERENCE_ID>,
  author = {},
  title = {},
  year = {},
  publisher = {},
  location = {},
  isbn = {}
}

% For instance, lecture slides (.pptx).
@unpublished{<REFERENCE_ID>,
  author = {},
  title = {},
  year = {},
  type = {},
  url = {},
  urldate = {}
}

% White papers, technical reports.
@report{<REFERENCE_ID>,
  author = {},
  title = {},
  institution = {},
  year = {},
  url = {},
  urldate = {}
}
```
