<?php 

namespace App\Controller;


use App\Repository\OpportunityRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Shuchkin\SimpleXLSXGen;
use Symfony\Component\Routing\Annotation\Route;

#[Route('/opportunity')]
class OpportunityController extends AbstractController  
{
    #[Route('/lastId', name: 'LastId', methods: ['GET'])]
    public function index(OpportunityRepository $oppRepo): Response
    {
        return $this->json($oppRepo->getLastId());
    }
    #[Route('/csv', name: 'csv', methods: ['GET'])]
    public function csv( Request $request) : Response
    {
        $response = new Response();
        $dataa = $request->query->all()['data'];
        dump ($dataa[1]);
        $data = array(
            
        );
        foreach ( $dataa as $line ) {
            array_push($data,  $line);
        }
        
    
        $fp = fopen(__DIR__ . '/../reporting/opportunities_list.csv', 'w');
        foreach ( $data as $line ) {
            $val = explode(",", $line);
            fputcsv($fp, $val);
        }
        fclose($fp);
        $response->headers->set('Content-Type', 'application/json');
        // Allow all websites
        $response->headers->set('Access-Control-Allow-Origin', '*');
            return $this->json($data);
    }
    #[Route('/csvsales', name: 'csvsales', methods: ['GET'])]
    public function csvsales( Request $request) : Response
    {
        $response = new Response();
        $dataa = $request->query->all()['data'];
        dump ($dataa[1]);
        $data = array(
            
        );
        foreach ( $dataa as $line ) {
            array_push($data,  $line);
        }
        
    
        $fp = fopen(__DIR__ . '/../reporting/sales_perfomance.csv', 'w');
        foreach ( $data as $line ) {
            $val = explode(",", $line);
            fputcsv($fp, $val);
        }
        fclose($fp);
        $response->headers->set('Content-Type', 'application/json');
        // Allow all websites
        $response->headers->set('Access-Control-Allow-Origin', '*');
            return $this->json($data);
    }
    #[Route('/xlsx', name: 'xlsx', methods: ['GET'])]
    public function xlsx( Request $request) : Response
    {
        $response = new Response();
        $dataa = $request->query->all()['data'];
        $data = array(
            
        );

        foreach ( $dataa as $line ) {
            $val = explode(",", $line);

            array_push($data,$val);
        }

        
        for ($i = 0; $i < count($data[0]); $i++) {
            if($i<14){
                $data[0][$i]='<style bgcolor="#FFFF00">'.$data[0][$i].'</style>';
            } 
            else{ $data[0][$i]='<style bgcolor="#0000FF">'.$data[0][$i].'</style>';}
        }
        dump ($data[0]);


        $xlsx =SimpleXLSXGen::fromArray( $data );
        $xlsx->saveAs(__DIR__ . '/../reporting/opportunities_list.xlsx');

    
        // $fp = fopen(__DIR__ . '/../reporting/opportunities_list.xlsx', 'w');
        // foreach ( $data as $line ) {
        //     $val = explode(",", $line);
        //     fputcsv($fp, $val);
        // }
        // fclose($fp);
        $response->headers->set('Content-Type', 'application/json');
        // Allow all websites
        $response->headers->set('Access-Control-Allow-Origin', '*');
            return $this->json($data);
    }
    #[Route('/xlsxsales', name: 'xlsxsales', methods: ['GET'])]
    public function xlsxsales( Request $request) : Response
    {
        $response = new Response();
        $dataa = $request->query->all()['data'];
        $data = array(
            
        );

        foreach ( $dataa as $line ) {
            $val = explode(",", $line);

            array_push($data,$val);
        }

        
        for ($i = 0; $i < count($data[0]); $i++) {
            if($i<14){
                $data[0][$i]='<style bgcolor="#FFFF00">'.$data[0][$i].'</style>';
            } 
            else{ $data[0][$i]='<style bgcolor="#0000FF">'.$data[0][$i].'</style>';}
        }
        dump ($data[0]);


        $xlsx =SimpleXLSXGen::fromArray( $data );
        $xlsx->saveAs(__DIR__ . '/../reporting/sales_perfomance.xlsx');

    
        // $fp = fopen(__DIR__ . '/../reporting/opportunities_list.xlsx', 'w');
        // foreach ( $data as $line ) {
        //     $val = explode(",", $line);
        //     fputcsv($fp, $val);
        // }
        // fclose($fp);
        $response->headers->set('Content-Type', 'application/json');
        // Allow all websites
        $response->headers->set('Access-Control-Allow-Origin', '*');
            return $this->json($data);
    }
    #[Route('/xlsxtable', name: 'xlsxtable', methods: ['GET'])]
    public function xlsxtable( Request $request) : Response
    {
        $response = new Response();
        $dataa = $request->query->all()['data'];
        $data = array(
            
        );

        foreach ( $dataa as $line ) {
            $val = explode(",", $line);

            array_push($data,$val);
        }

        
        for ($i = 0; $i < count($data[0]); $i++) {
            if($i<20){
                $data[0][$i]='<style bgcolor="#FFFF00">'.$data[0][$i].'</style>';
            } 
            else{ $data[0][$i]='<style bgcolor="#0000FF">'.$data[0][$i].'</style>';}
        }
        dump ($data[0]);


        $xlsx =SimpleXLSXGen::fromArray( $data );
        $xlsx->saveAs(__DIR__ . '/../reporting/opp_table.xlsx');

    
        // $fp = fopen(__DIR__ . '/../reporting/opportunities_list.xlsx', 'w');
        // foreach ( $data as $line ) {
        //     $val = explode(",", $line);
        //     fputcsv($fp, $val);
        // }
        // fclose($fp);
        $response->headers->set('Content-Type', 'application/json');
        // Allow all websites
        $response->headers->set('Access-Control-Allow-Origin', '*');
            return $this->json($data);
    }
}
