<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
    <xsl:output method="xml" indent="yes"/>

    <xsl:template match="/">
        <jedi>
            <xsl:for-each select="starwars/karakter[rolle='Jedi' or rolle='Jedi Mester']">
                <navn><xsl:value-of select="navn"/></navn>
            </xsl:for-each>
        </jedi>
    </xsl:template>
</xsl:stylesheet>
