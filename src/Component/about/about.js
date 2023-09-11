import React from 'react';
import './about.scss';
import {Paper} from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";

export const About = () => {
    return (
        <Paper id={"about"}>
            <div className="about-container">
                <h2 className="about-container__heading">Witaj na naszej stronie!</h2>
                <Grid container spacing={2}>
                    <Grid xs={12} md={4}>
                        <p className="about-container__paragraph">
                            Jesteśmy pasjonatami kwiatów i sztuki florystycznej, którzy pragną dostarczać piękne i
                            wyjątkowe
                            bukiety do Twoich drzwi. Nasza historia rozpoczęła się z miłości do natury i pragnienia
                            dzielenia się nią z innymi.
                        </p>
                    </Grid>
                    {/*<Grid xs={12} md={4}>*/}
                    {/*    <img*/}
                    {/*        src={"https://images.pexels.com/photos/6231809/pexels-photo-6231809.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"}*/}
                    {/*        alt={"Owners"} className={"about-container__heading__img"}/>*/}
                    {/*</Grid>*/}
                    <Grid xs={12} md={4}>
                        <p className="about-container__paragraph">
                            Nasza misja to tworzenie niezapomnianych chwil i wyrażanie emocji za pomocą pięknych
                            kwiatów.
                            Niezależnie od okazji - czy to romantyczne randki, świętowanie urodzin, wyraz wdzięczności
                            czy
                            wyrazy współczucia - nasze bukiety są starannie komponowane, aby w pełni oddać uczucia,
                            które
                            chcesz przekazać.
                        </p>
                    </Grid>
                </Grid>
                <div className="about-container__highlighted-features">
                    <div className="about-container__feature about-container__feature--kreatywnosc">
                        <h3 className="about-container__feature__heading">Kreatywność</h3>
                        <p className="about-container__feature__description">Nasz zespół florystów to prawdziwi artyści,
                            którzy tworzą bukiety, które zachwycają kształtem, kolorem i aromatem.</p>
                    </div>
                    <div className="about-container__feature about-container__feature--swiezosc">
                        <h3 className="about-container__feature__heading">Świeżość</h3>
                        <p className="about-container__feature__description">Dla nas każdy bukiet to dzieło sztuki,
                            dlatego używamy tylko najświeższych kwiatów, aby zapewnić długotrwałą radość i piękno.</p>
                    </div>
                    <div className="about-container__feature about-container__feature--indywidualne-podejscie">
                        <h3 className="about-container__feature__heading">Indywidualne podejście</h3>
                        <p className="about-container__feature__description">Rozumiemy, że każdy klient jest wyjątkowy.
                            Dlatego staramy się dostosować nasze bukiety do Twoich potrzeb i gustu.</p>
                    </div>
                    <div className="about-container__feature about-container__feature--wygoda">
                        <h3 className="about-container__feature__heading">Wygoda</h3>
                        <p className="about-container__feature__description">Nasza strona internetowa umożliwia łatwe i
                            szybkie zamawianie bukietów, bez względu na to, gdzie się znajdujesz.</p>
                    </div>
                </div>
                <p className="about-container__paragraph">
                    Dziękujemy, że jesteś częścią naszej historii i pozwalasz nam być częścią Twoich najważniejszych
                    chwil. Cieszymy się, że możemy dostarczyć piękno natury prosto do Twojego życia.
                </p>
                <p className="about-container__signature">
                    Z miłością do kwiatów,<br/>
                    Zespół <strong>ZamówBukiet.pl</strong>
                </p>
            </div>
        </Paper>
    );
}